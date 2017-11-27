import * as reducers from "./reducers";
import * as actions from "./actions";
import {Contact} from "../ContactUtils";
import {initialState} from "../consts";

const contactA = new Contact(1972, 'Beker', 7, ['a', 'b']);
const contactB = new Contact(166972, 'FOR', 2, ['men', 'amen']);
describe('reducers: contacts', () => {
    it('should return the initial state', () => {
        expect(reducers.contacts(undefined, {})).toEqual(initialState.contacts);
    });

    it('should handle ADD_CONTACT', () => {

        expect(
            reducers.contacts({}, {
                type: actions.ADD_CONTACT,
                contact: contactA
            })
        ).toEqual(
            {
                1972: contactA
            }
        );

        expect(
            reducers.contacts(
                {
                    1972: contactA
                },
                {
                    type: actions.ADD_CONTACT,
                    contact: contactB
                }
            )
        ).toEqual({
            1972: contactA,
            166972: contactB
        })
    })
});