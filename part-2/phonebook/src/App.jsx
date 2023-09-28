/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const isFound = persons.find((person) => person.name === name.trim());

    const personObject = {
      name,
      number,
    };

    if (isFound) {
      if(isFound.number !== number) {
        if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
         personService.update(isFound.id, personObject)
            .then(updatedPerson => 
                setPersons(persons.map(person => person.id !== isFound.id ? person : updatedPerson))
              )
              .catch(() => {
                setStatusMessage(`Information of ${name} has already been deleted`)
                setStatus('error')
              })
          setName("");
          setNumber("");
          setStatusMessage(`Updated ${name} number sucessfully!`)
          setStatus('success')
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== isFound.id))
        }
      } else {
        setStatusMessage(`${name} is already added to phonebook`)
        setStatus('error')
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setName("");
      setNumber("");
      setStatusMessage(`Added ${name} successfully!`)
      setStatus('success')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value.trim());
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
      personService.deleteEntry(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} status={status}/>
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
