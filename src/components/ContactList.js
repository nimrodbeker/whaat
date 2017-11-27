import React from 'react'
import Contact from "../containers/ContactContainer";
import Headers from "./Headers";
import {AddContact} from "../containers/AddContact";

export const ContactsListDisplay = ({contacts}) => {
    return <div>
        <table className="highlight centered">
            <Headers/>
            <tbody>
            {contacts.map((contact) => <Contact key={contact.id} contact={contact}/>)}
            </tbody>
        </table>
        <AddContact/>
    </div>
};