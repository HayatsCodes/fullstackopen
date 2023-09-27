/* eslint-disable react/prop-types */
import { useState } from "react";

const Filter = ({ filter, handleFilter }) => (
  <div>
    filter: <input value={filter} onChange={handleFilter} />
  </div>
);

const PersonForm = ({
  addPerson,
  newName,
  number,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

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
