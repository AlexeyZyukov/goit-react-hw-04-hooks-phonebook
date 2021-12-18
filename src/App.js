import React, { Component } from 'react';

import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Contacts from './components/Contacts/Contacts';
import styles from './components/styles.module.css';

import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name.includes(name))) {
      alert(`${name} is already in contacts!`);
    } else {
      this.setState({
        contacts: [...contacts, { name, number, id: uuidv4() }],
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => {
        return contact.id !== contactId;
      }),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  componentDidMount() {
    const contactsFrmStorage = JSON.parse(localStorage.getItem('phoneBook'));
    if (contactsFrmStorage) {
      this.setState({ contacts: contactsFrmStorage });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('phoneBook', JSON.stringify(contacts));
    }
  }

  render() {
    return (
      <div className={(styles.container, styles.wrapper)}>
        <h1 className="title">Phonebook</h1>
        <Form onFormSubmit={this.addContact} />
        <h2 className="title">Contacts</h2>
        <Filter onFilterChange={this.changeFilter} toFind={this.filter} />
        <Contacts
          onFilter={this.filterContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
