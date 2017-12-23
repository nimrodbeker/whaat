const DRY_RUN_OVERRIDE = false;
const EXTENSION_STORE = 'EXTENSION_STORE';
const ACTIONS_QUEUE = 'ACTIONS_QUEUE';
const LOGGING_CONTACT = 'Logger';
const DAY = 3600 * 24;

const timeConstraints = {earliest: 9, latest: 22};
const runLogicInterval = 300 * 1000;
const peopleYouContactOften = [];
const peopleYouDONTContactOften = [];
let currentDate = new Date(); // for last run purpose
let lastLoggingChatProcessed = null; // msg id
let runLogicIntervalID = null;
let runCommanderIntervalID = null;
let loggingChat;

/*
 * action types
 */
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const CHANGE_SORT = 'CHANGE_SORT';
const ADD_STARTERS_GROUP = 'ADD_STARTERS_GROUP';
const REMOVE_STARTERS_GROUP = 'REMOVE_STARTERS_GROUP';
const UPDATE_STARTERS_GROUP = 'UPDATE_STARTERS_GROUP';
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
const SET_ACTIVE = 'SET_ACTIVE';
const UPDATE_LAST_RUN = 'UPDATE_LAST_RUN';

/*
 * action creators
 */
function toggleActive() {
    return {type: TOGGLE_ACTIVE};
}

function setActive(isActive) {
    return {type: SET_ACTIVE, isActive};
}

function addContact(contact) {
    return {type: ADD_CONTACT, contact: contact};
}

function removeContact(id) {
    return {type: REMOVE_CONTACT, id}
}

function updateContact(oldId, contact) {
    return {type: UPDATE_CONTACT, oldId, contact}
}

function addStarter(groupName) {
    return {type: ADD_STARTERS_GROUP, groupName}
}

function removeStarter(groupName) {
    return {type: REMOVE_STARTERS_GROUP, groupName}
}

function updateStarter(groupName, groupValues) {
    return {type: UPDATE_STARTERS_GROUP, groupName, groupValues}
}

function changeSort(key) {
    return {type: CHANGE_SORT, key}
}

function updateLastRun(lastRun) {
    return {type: UPDATE_LAST_RUN, lastRun}
}


const whatsappLog = (msg) => {
    sendMessage(loggingChat, msg)
};

const calculateNextCheckup = () => {
    return (new Date(currentDate.getTime() + runLogicInterval)).toLocaleString()
};

const getStoreIfReady = () => {
    store = JSON.parse(localStorage.getItem(EXTENSION_STORE));
    if (window.Store === undefined ||
        window.Store.Conn === undefined ||
        window.Store.Chat === undefined ||
        window.Store.Contact === undefined ||
        store === undefined
    ) {
        console.log('Resources not loaded yet.');
        return;
    }
    return store
};

const getContactByPhone = (pno) => {
    pno += "@c.us";
    return window.Store.Contact.get(pno);
};

const getContactByName = (name) => {
    const Contacts = Store.Contact.models;
    for (let i in Contacts) {
        const contact = Contacts[i];
        if (contact.searchName !== undefined &&
            contact.searchName !== null &&
            contact.searchName.indexOf(name.toLowerCase()) === 0) {
            return contact;
        }
    }
};

const getChatByID = (id) => {
    return window.Store.Chat.get(id);
};

const getLastMsgTime = (chat) => {
    if (chat !== undefined && chat.t) {
        return chat.t;
    }
};

const setOrCreateLogger = () => {
    if (window.Store.Contact.models === undefined || window.Store.Contact.models.length === 0) {
        console.log('Resources not loaded yet.');
        return;
    }
    let loggerContactObj = getContactByName(LOGGING_CONTACT);
    if (loggerContactObj === undefined) {
        if (confirm('Create Logging contact(group?)')) {
            Store.Chat.createGroup(LOGGING_CONTACT, undefined, undefined, [Store.Contact.get(Store.Conn.me)]);
        }
    }
    else {
        loggingChat = getChatByID(loggerContactObj.id);
    }
};

const setContactObjects = (contact) => {
    contact.contactObject = contact.isPhoneNumber ? getContactByPhone(contact.id) : getContactByName(contact.id);
    contact.chatObject = getChatByID(contact.contactObject.id);
    contact.lastConversation = getLastMsgTime(contact.chatObject);
};

const generateRandomStater = (all_groups, contact_groups) => {
    const posibillities = contact_groups.reduce((a, b) => a.concat(all_groups[b]), []);
    return posibillities[Math.floor(Math.random() * posibillities.length)];
};
const sendMessage = (chatObject, msg) => {
    chatObject.sendMessage(msg)
};
const updateStore = (store) => {
    store.lastRun = new Date().getTime();
    localStorage.setItem(EXTENSION_STORE, JSON.stringify(store));
};


const addActionToQueue = (action) => {
    const actionsQueue = JSON.parse(localStorage.getItem(ACTIONS_QUEUE)) || [];
    actionsQueue.push(action);
    actionsQueue.push(updateLastRun(new Date().getTime()));
    localStorage.setItem(ACTIONS_QUEUE, JSON.stringify(actionsQueue));
};

const Logic = () => {
    const store = getStoreIfReady();
    if (store === undefined) {
        return
    }

    currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < timeConstraints.earliest || currentHour > timeConstraints.latest) {
        return;
    }
    const currentUnixTime = currentDate.getTime() / 1000;
    peopleYouContactOften.splice(0, peopleYouContactOften.length); // Empty the array
    peopleYouDONTContactOften.splice(0, peopleYouDONTContactOften.length); // Empty the array

    for (let c in store.contacts) {
        const contact = store.contacts[c];
        setContactObjects(contact);
        addActionToQueue(updateContact(contact.id, contact));
        const message = generateRandomStater(store.starters, contact.starters);
        if (currentUnixTime - contact.interval * DAY > contact.lastConversation) {//currentUnixTime - timeDelta > lastMsgTime) {
            peopleYouDONTContactOften.push([contact.chatObject.name, new Date(contact.lastConversation * 1000)]);
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
    updateStore(store);
};


Logic();
runLogicIntervalID = setInterval(() => {
    Logic()
}, runLogicInterval);


const commands = {
    help: ['print help', (store) => {
        let ret = '';
        for (let k in commands) {
            ret += `${k}: ${commands[k][0]}\n`
        }
        return ret;
    }],
    stats: ['print stats', (store) => {
        let ret = `*Last checkup was at ${currentDate.toLocaleString()},* \n`;
        ret += `*You keep in touch with:* \n`;
        ret += `  ${peopleYouContactOften.join(', \n  ')}\n `;
        ret += `*You dont keep in touch with:* \n`;
        ret += `  ${peopleYouDONTContactOften.map((p) => (`  *${p[0]}* since _${p[1].toLocaleString()}_ \n  `))} `;
        ret += `*Next checkup was at ${calculateNextCheckup()},*`;
        return ret;

    }],
    activate: ['activate', (store) => {
        store.active = true;
        addActionToQueue(setActive(store.active));
        return '*Sending messages activated*';
    }],
    deactivate: ['deactivate', (store) => {
        store.active = false;
        addActionToQueue(setActive(store.active));
        return '*Sending messages deactivated*';
    }],
    isactive: ['return wheter messaging is active', (store) => {
        return store.active;
    }],
    healthy: ['return wheter ran in last 10min', (store) => {
        return ((new Date).getTime() - currentDate.getTime()) < 10 * 60 * 1000;
    }],
    run: ['run now', (store) => {
        Logic();
        return '*Running core logic*';
    }],
    disable: ['disable core logic', (store) => {
        clearInterval(runLogicIntervalID);
        return '*Killing core logic loop*';
    }],
    enable: ['revive core logic', (store) => {
        runLogicIntervalID = setInterval(() => {
            Logic()
        }, runLogicInterval);
        return '*Restored core logic loop*';
    }],
    terminate: ['Kill commander loop (irreversible remotely)', (store) => {
        clearInterval(runCommanderIntervalID);
        return '*Killing commander loop, Manual restart required to re-operate*';
    }]
};

const Commander = () => {
    const store = getStoreIfReady();
    if (store === undefined) {
        return;
    }
    if (loggingChat === undefined) {
        setOrCreateLogger();
        return;
    }
    const lastMsg = loggingChat.msgs.last();
    if (lastLoggingChatProcessed === lastMsg.id.id || lastMsg.body === commands.help[1]()) {
        // Already replied to this message
        return;
    }
    whatsappLog(commands[commands.hasOwnProperty(lastMsg.body.toLowerCase()) ? lastMsg.body.toLowerCase() : 'help'][1](store));
    lastLoggingChatProcessed = loggingChat.msgs.last().id.id;
    updateStore(store);
};


runCommanderIntervalID = setInterval(() => {
    Commander()
}, 2000);