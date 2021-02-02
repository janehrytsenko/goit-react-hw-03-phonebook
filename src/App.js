import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import s from './App.module.css'


class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase())
    )
    {
      alert(`${name} is already in contacts`);
    } 
    else if
      (contacts.find(
        contact => contact.number === number)
    )
    {
      alert(`${number} is already in contacts`);
    }
    else if
      (name.trim() === '' || number.trim() === '')
    {
      alert("Enter the contact's name and number phone!");
    }
    else if
      (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number))
    {
      alert('Enter the correct number phone!');
    }
    else
    {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }

    console.log(contacts);
    
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase()
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>
        <h2 className={s.contacts}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={filteredContacts} onDelete={this.deleteContact}/>
        </div>
    )
  }
}

export default App;
