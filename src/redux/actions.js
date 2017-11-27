/*
 * action types
 */
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const CHANGE_SORT = 'CHANGE_SORT';
export const ADD_STARTERS_GROUP = 'ADD_STARTERS_GROUP';
export const REMOVE_STARTERS_GROUP = 'REMOVE_STARTERS_GROUP';
export const UPDATE_STARTERS_GROUP = 'UPDATE_STARTERS_GROUP';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
export const UPDATE_LAST_RUN = 'UPDATE_LAST_RUN';

/*
 * action creators
 */
export function toggleActive() {
    return {type: TOGGLE_ACTIVE};
}

export function addContact(contact) {
    return {type: ADD_CONTACT, contact: contact};
}

export function removeContact(id) {
    return {type: REMOVE_CONTACT, id}
}

export function updateContact(oldId, contact) {
    return {type: UPDATE_CONTACT, oldId, contact}
}

export function addStarter(groupName) {
    return {type: ADD_STARTERS_GROUP, groupName}
}

export function removeStarter(groupName) {
    return {type: REMOVE_STARTERS_GROUP, groupName}
}

export function updateStarter(groupName, groupValues) {
    return {type: UPDATE_STARTERS_GROUP, groupName, groupValues}
}

export function changeSort(key) {
    return {type: CHANGE_SORT, key}
}

export function updateLastRun(lastRun) {
    return {type: UPDATE_LAST_RUN, lastRun}
}