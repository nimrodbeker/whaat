import {
    ADD_CONTACT,
    ADD_STARTERS_GROUP,
    CHANGE_SORT,
    REMOVE_CONTACT,
    REMOVE_STARTERS_GROUP, SET_ACTIVE, TOGGLE_ACTIVE,
    UPDATE_CONTACT, UPDATE_LAST_RUN,
    UPDATE_STARTERS_GROUP
} from './actions'
import {combineReducers} from 'redux'
import {initialState} from "../consts";


export const contacts = (state = initialState.contacts, action) => {
    const newState = {...state};
    switch (action.type) {
        case ADD_CONTACT:
            if (newState.hasOwnProperty(action.contact.id)) {
                alert(`ID ${action.contact.id} Already exists`);
                return newState;
            }
            newState[action.contact.id] = action.contact;
            return newState;
        case REMOVE_CONTACT:
            delete newState[action.id];
            return newState;
        case UPDATE_CONTACT:
            if(!state.hasOwnProperty(action.oldId)){
                return state;
            }
            delete newState[action.oldId];
            newState[action.contact.id] = action.contact;
            return newState;
        default:
            return state;
    }
};
export const sort = (state = initialState.sort, action) => {
    switch (action.type) {
        case CHANGE_SORT:
            const newState = {key: action.key, order: true};
            if (state.key === action.key) {
                newState.order = !state.order
            }
            return newState;
        default:
            return state;
    }
};

export const starters = (state = initialState.starters, action) => {
    const newState = {...state};
    switch (action.type) {
        case ADD_STARTERS_GROUP:
            if(newState.hasOwnProperty(action.groupName)){
                return newState;
            }
            newState[action.groupName] = [];
            return newState;
        case REMOVE_STARTERS_GROUP:
            delete newState[action.groupName];
            //TODO: Remove group from all contacts - middleware?
            return newState;
        case UPDATE_STARTERS_GROUP:
            newState[action.groupName] = action.groupValues;
            return newState;
        default:
            return state;
    }
};

export const active = (state = initialState.active, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE:
            return !state;
        case SET_ACTIVE:
            return action.isActive;
        default:
            return state;
    }
};
export const lastRun = (state = initialState.lastRun, action) => {
    switch (action.type) {
        case UPDATE_LAST_RUN:
            return action.lastRun;
        default:
            return state;
    }
};

const whatsappController = combineReducers({
    contacts,
    sort,
    starters,
    active,
    lastRun
});
export default whatsappController