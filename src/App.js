import { useState } from 'react';

import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Contacts from './components/Contacts/Contacts';
import useLocalStorage from './components/hooks/useLocalStorage';
import styles from './components/styles.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [toFilter, setToFilter] = useState('');

  const addContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name.includes(name))) {
      alert(`${name} is already in contacts!`);
    } else {
      setContacts(prevState => [...prevState, { name, number, id: uuidv4() }]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = evt => {
    setToFilter(evt.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toFilter.toLowerCase()),
    );
  };

  return (
    <div className={(styles.container, styles.wrapper)}>
      <h1 className="title">Phonebook</h1>
      <Form onFormSubmit={addContact} />
      <h2 className="title">Contacts</h2>
      <Filter onFilterChange={changeFilter} toFind={toFilter} />
      <Contacts onFilter={filterContacts()} onDelete={deleteContact} />
    </div>
  );
}
