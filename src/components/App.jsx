import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

const LOCAL_STORAGE_CONTACT = "contacts"

export function App() {

  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_CONTACT)) ?? []);
  const [filter, setfilter] = useState('');


  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_CONTACT, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId))
  };

  const onNewContactAdd = (formData) => {
    if (onDoppleContactInfoAdd(formData)) {
      alert(`Contact "${formData.name}" or number "${formData.number}" is already in your contactlist!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: formData.name,
      number: formData.number,
    };
    setContacts((prevState) => [newContact, ...prevState]);
  };

  const onDoppleContactInfoAdd = (newContact) => {
    return contacts.find(contact => contact.number === newContact.number || contact.name === newContact.name);
  }

  const onFilterChange = (event) => {
    setfilter(event.currentTarget.value);
  };

  const visibleContacts = () => {
    const filteredLowerCase = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filteredLowerCase)
    );
  };

  const filterteContact = visibleContacts();

  return (
    <div
      style={{
        margin: "100px auto",
        background: 'white',
        padding: '15px',
        width: "600px",
        fontSize: '20px',
        border: '1px solid grey'
      }}
    >
      <h3>Phonebook</h3>
      <ContactForm onSubmitForm={onNewContactAdd} />
      <hr />
      <h4>Find contacts by name</h4>
      <Filter
        filterValue={filter}
        onChangeFilter={onFilterChange}
      />
      <ContactList
        contacts={filterteContact}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
