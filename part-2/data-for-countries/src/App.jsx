import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
    if (!event.target.value) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  const regex = new RegExp(`${filter}`, "i");
  const filteredCountries = showFilter
    ? countries.filter((country) => regex.test(country.name.common))
    : [];

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilter} />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length !== 1 
          ? (
          filteredCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))
        ) 
        : (
          <div>
            <h1>{filteredCountries[0].name.official}</h1>
            <p>Name: {filteredCountries[0].name.common}</p>
            <p>Capital: {filteredCountries[0].capital[0]}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {
              Object.values(filteredCountries[0].languages).map(language => (
                 <li key={language}>{language}</li>
              ))
              }
            </ul>
            <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt} />
          </div>
        )
      }
      </div>
    </div>
  );
};

export default App;
