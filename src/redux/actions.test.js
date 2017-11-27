import {Contact} from "../ContactUtils";
import * as actions from "./actions";

describe('actions: Add Contact', () => {
    it('should create an action to add a contact', () => {
        const contact = new Contact(972, 'Beker', 7, ['formal', 'men']);
        const expectedAction = {
            type: actions.ADD_CONTACT,
            contact
        };
        expect(actions.addContact(contact)).toEqual(expectedAction)
    })
});


describe('actions: Remove Contact', () => {
    it('should create an action to remove a contact', () => {
        const id = 972;
        const expectedAction = {
            type: actions.REMOVE_CONTACT,
            id
        };
        expect(actions.removeContact(id)).toEqual(expectedAction)
    })
});

describe('actions: Update Contact', () => {
    it('should create an action to update a contact', () => {
        const oldId = 942;
        const contact = new Contact(1972, 'Beker', 7, ['a', 'b']);
        const expectedAction = {
            type: actions.UPDATE_CONTACT,
            contact,
            oldId
        };
        expect(actions.updateContact(oldId, contact)).toEqual(expectedAction)
    })
});



describe('actions: Change Sort', () => {
    it('should create an action to change sort', () => {
        const key = 'name';
        const expectedAction = {
            type: actions.CHANGE_SORT,
            key
        };
        expect(actions.changeSort(key)).toEqual(expectedAction)
    })
});