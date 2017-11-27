const ExtensionStore = 'ExtensionStore';
const DAY = 3600 * 24;
const timeConstraints = {earliest: 9, latest: 22};
const LoggingContact = 'Logger';
const runLogicInterval = 300 * 1000;
const DRY_RUN_OVERRIDE = false;
const getContactByPhone = (Contacts, pno) => {
    for (let i in Contacts) {
        const contact = Contacts[i];
        if (contact === undefined || contact.id === undefined || contact.id === null) {
            continue;
        }
        if (contact.id.indexOf(pno) === 0 && contact.id.indexOf('g.us') === -1)
            return contact;
    }
};

const getContactByName = (Contacts, name) => {
    for (let i in Contacts) {
        const contact = Contacts[i];
        if (contact.searchName !== undefined &&
            typeof(contact.searchName) === "string" &&
            contact.searchName.indexOf(name.toLowerCase()) === 0) {
            return contact;
        }
    }
};

const getChatByID = (Chats, id) => {
    for (let chat in Chats) {
        if (isNaN(chat) || Chats[chat] === undefined) {
            continue;
        }
        if (Chats[chat].id === id) {
            return Chats[chat];
        }
    }
};

const getLastMsgTime = (chat) => {
    if (chat !== undefined && chat.t) {
        return chat.t;
    }
};


const setContactObjects = (contact) => {
    contact.contactObject = contact.isPhoneNumber ? getContactByPhone(window.Store.Contact.models, contact.id) : getContactByName(window.Store.Contact.models, contact.id);
    contact.chatObject = getChatByID(window.Store.Chat.models, contact.contactObject.id);
    contact.lastConversation = getLastMsgTime(contact.chatObject);
};

const generateRandomStater = (all_groups, contact_groups) => {
    const posibillities = contact_groups.reduce((a, b) => a.concat(all_groups[b]), []);
    return posibillities[Math.floor(Math.random() * posibillities.length)];
};
const sendMessage = (chatObject, msg) => {
    chatObject.sendMessage(msg)
};

const Logic = () => {
    const store = JSON.parse(sessionStorage.getItem(ExtensionStore));
    if (window.Store === undefined || store === null) {
        console.log('Resources not loaded yet.');
        return;
    }
    const loggingChat = getChatByID(window.Store.Chat.models,
        getContactByName(window.Store.Contact.models,
            LoggingContact).id);
    const whatsappLog = (msg) => {
        sendMessage(loggingChat, msg)
    };

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < timeConstraints.earliest || currentHour > timeConstraints.latest) {
        whatsappLog(`*OUT OF TIMEFRAME* \n*Next checkup: ${new Date(new Date().getTime() + runLogicInterval)}*`);
        return;
    }
    const currentUnixTime = currentDate.getTime() / 1000;
    const peopleYouContactOften = [];

    for (let c in store.contacts) {
        const contact = store.contacts[c];
        setContactObjects(contact);
        const message = generateRandomStater(store.starters, contact.starters);
        if (currentUnixTime - contact.interval * DAY > contact.lastConversation) {//currentUnixTime - timeDelta > lastMsgTime) {
            whatsappLog(`Last chat with ${contact.chatObject.name} was at ${new Date(contact.lastConversation * 1000)}`);
            if (!store.active || DRY_RUN_OVERRIDE) {
                console.log(contact.chatObject.name, message);
            }
            else {
                sendMessage(contact.chatObject, message);
            }
        }
        else {
            peopleYouContactOften.push(contact.chatObject.name);
        }
    }
    store.lastRun = currentUnixTime;
    sessionStorage.setItem(ExtensionStore, JSON.stringify(store));
    whatsappLog(`You keep in touch with: ${peopleYouContactOften.join(',\n')}`);
    whatsappLog(`*Next checkup: ${new Date(new Date().getTime() + runLogicInterval)}*`);
};


Logic();
let runLogicIntervalID = setInterval(() => {
    Logic()
}, runLogicInterval);