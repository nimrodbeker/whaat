import {addStarter, removeContact, updateContact} from "../redux/actions";
import DisplayContact from "../components/Contact";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {starters: Object.keys(state.starters)}
};
const mapDispatchToProps = dispatch => {
    return {
        onContactRemove: id => {
            dispatch(removeContact(id))
        },
        onCellEdit: (oldId, contact) => {
            dispatch(updateContact(oldId, contact))
        },
        onStartersChange: newValues => {
            newValues.map((item) => {
                return dispatch(addStarter(item.value))
            })
        }
    }
};
const Contact = connect(
    mapStateToProps, mapDispatchToProps
)(DisplayContact);

export default Contact