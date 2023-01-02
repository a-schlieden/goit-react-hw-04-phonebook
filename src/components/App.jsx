import { nanoid } from "nanoid";
// import { useState } from "react";
import React, { Component } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

const LOCAL_STORAGE_CONTACT = "contacts"

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  // const [filter, setfilter] = useState('');

  componentDidMount() {
    const contacts = localStorage.getItem(LOCAL_STORAGE_CONTACT)
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LOCAL_STORAGE_CONTACT, JSON.stringify(this.state.contacts))
    }
  }

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  onNewContactAdd = (formData) => {
    if (this.onDoppleContactInfoAdd(formData)) {
      alert(`Contact "${formData.name}" or number "${formData.number}" is already in your contactlist!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: formData.name,
      number: formData.number,
    };
    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  onDoppleContactInfoAdd = (newContact) => {
    return this.state.contacts.find(contact => contact.number === newContact.number || contact.name === newContact.name);
  }

  onFilterChange = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const filteredLowerCase = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filteredLowerCase)
    );
  };

  render() {
    const { filter } = this.state;
    const filterteContact = this.visibleContacts();

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
        <ContactForm onSubmitForm={this.onNewContactAdd} />
        <hr />
        <h4>Find contacts by name</h4>
        <Filter
          filterValue={filter}
          onChangeFilter={this.onFilterChange}
        />
        <ContactList
          contacts={filterteContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
