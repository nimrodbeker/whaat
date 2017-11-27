import React from 'react'
import EditableCell from './EditableCell'
import {Remove} from "../utils"
import MultiSelect from "./MultiSelect";
import Moment from 'react-moment';
import {DAY} from '../consts'

const editStarters = (onCellEdit, contact, newValues, onStartersChange) => {
    onStartersChange(newValues);
    onCellEdit(contact.id, {...contact, starters: newValues});
};

const DisplayContact = ({contact, onContactRemove, onCellEdit, onStartersChange, starters}) => (
    <tr style={((new Date().getTime() / 1000) - contact.interval * DAY > contact.lastConversation) ? {color: 'red'} : {}}>
        <td>
            <Remove onClick={() => (onContactRemove(contact.id))}/>
        </td>
        <th>{contact.id}</th>
        <EditableCell property='name' contact={contact} onCellEdit={onCellEdit}/>
        <EditableCell property='interval' contact={contact} onCellEdit={onCellEdit} int/>
        <td>
            <MultiSelect options={starters} values={contact.starters}
                         onValuesChange={(newValues) => {
                             editStarters(onCellEdit, contact, newValues, onStartersChange)
                         }} placeholder="Starters.."/>
        </td>
        {/*<td>{contact.messagesInChat}</td>*/}
        <td><Moment unix fromNow>{contact.lastConversation}</Moment></td>
        <td>
        </td>
    </tr>
);

export default DisplayContact