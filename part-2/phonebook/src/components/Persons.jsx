/* eslint-disable react/prop-types */
const DeleteButton = ({ handleDelete }) => (
  <button onClick={handleDelete}>delete</button>
);

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map((person) => (
      <div key={person.id}>
        <p>
          {person.name} {person.number}
        </p>
        <DeleteButton handleDelete={() => handleDelete(person.name, person.id)}/>
      </div>
    ))}
  </div>
);

export default Persons;
