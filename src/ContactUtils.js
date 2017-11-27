export class Contact {
    constructor(id, name, interval, starters) {
        this.id = id;
        this.name = name;
        this.starters = starters;
        if (typeof starters === 'string') {
            this.starters = starters.replace(/,/g, ' ').split(/ +/);
        }
        this.interval = Number.parseInt(interval, 10);
        this.lastConversation = 0;
        this.messagesInChat = 0;
        this.isPhoneNumber = !isNaN(id);
        this.contactObject = null;
        this.chatObject = null;
    }
}