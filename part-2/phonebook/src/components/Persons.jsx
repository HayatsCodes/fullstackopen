/* eslint-disable react/prop-types */
const Persons = ({ persons }) => (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );

  export default Persons