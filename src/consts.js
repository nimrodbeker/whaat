import {Contact} from "./ContactUtils";

export const DEBUG = true;
export const Contacts = {
    Logger: new Contact('Logger', 'Sanity Contact', -1, 'formal, women')
};
const Starters = {
    formal: ['היי מה קורה?', 'מה הולך?', 'מה נשמע?'],
    informal: ['!', 'יו'],
    bro: ['מה איתך אח?'],
    women: ['היי את'],
    english: ['Hey!', 'Yo!', 'Wazzuppp??'],
    group: ['אז מתי אמרנו יושבים']
};
export const initialState = {
    active: false,
    intervalDuration: 1,
    lastUpdate: null,
    sort: {key: 'id', order: true},
    starters: Starters,
    contacts: Contacts,
    lastRun: 0
};

export const DAY = 3600 * 24;

