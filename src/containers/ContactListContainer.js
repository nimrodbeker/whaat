import {connect} from "react-redux";
import {changeSort} from "../redux/actions";
import {ContactsListDisplay} from "../components/ContactList";
import {headers} from "../components/Headers";
import {getObjectValues, getStringCompareFunction} from "../utils";

const getSortedContacts = (contacts, sort) => {
    const header = headers[sort.key];
    const sortFunction = (header.hasOwnProperty('sortFunction') ? header.sortFunction : getStringCompareFunction)(sort.key);
    const sortedContacts = getObjectValues(contacts).sort(sortFunction);
    if (sort.order) {
        return sortedContacts.reverse();
    }
    return sortedContacts;
};


const mapStateToProps = state => {
    return {
        contacts: getSortedContacts(state.contacts, state.sort),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHeaderClick: key => {
            dispatch(changeSort(key))
        }
    }
};
const ContactsList = connect(
    mapStateToProps, mapDispatchToProps
)(ContactsListDisplay);

export default ContactsList