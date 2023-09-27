/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from 'axios'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = persons.find((person) => person.name === newName.trim());

    if (newPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: number,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const regex = new RegExp(`${filter}`, "i");
  const filteredPersons = persons.filter((person) => regex.test(person.name));

  const personToShow = showFilter ? filteredPersons : persons;

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (!value) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personToShow}/>
    </div>
  );
};

export default App;