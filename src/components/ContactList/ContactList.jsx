import React from "react"
import PropTypes from 'prop-types';
import style from './ContactList.module.css';
import { ContactListItem } from "components/ContactListItem/ContactListItem";


export const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <>
            {contacts.length === 0 ?
                (<p> No saved contacts </p>) :
                (<ul className={style.contactList}>
                    {contacts.map(item => (
                        <li key={item.id} className={style.contactListItem}>
                            <ContactListItem name={item.name} number={item.number} deleteContact={() => onDeleteContact(item.id)} />
                        </li>
                    ))}
                </ul>)

            }
        </>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired
};