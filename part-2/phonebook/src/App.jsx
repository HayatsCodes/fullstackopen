/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import axios from "axios";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = persons.find((person) => person.name === name.trim());

    if (newPerson) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    const personObject = {
      name,
      number,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setName("");
      setNumber("");
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
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

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
