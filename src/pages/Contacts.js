import React from 'react'
import ContactsList from "../containers/ContactListContainer";
import {Grid, Switch, Cell} from "react-mdl";
import {toggleActive} from "../redux/actions";
import {connect} from "react-redux";
import {Moment} from "react-moment";

const ContactsPage = ({appActive, toggleActive, lastRun}) => {
    return <div>
        <Grid>
            <Cell col={6}>
                <h5>CONTACTS</h5>
            </Cell>
            <Cell col={6} id="switchConatiner">
                <Switch ripple onChange={toggleActive} checked={appActive}>Activate</Switch>
            </Cell>
        </Grid>
        <strong>Last Run: </strong> {lastRun.toLocaleString()} <br />
        <ContactsList/>
    </div>
};
const mapStateToProps = state => {
    return {appActive: state.active,
    lastRun: state.lastRun}
};
const mapDispatchToProps = dispatch => {
    return {
        toggleActive: () => {
            dispatch(toggleActive())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)