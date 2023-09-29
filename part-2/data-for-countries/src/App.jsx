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
        ) : (
          filteredCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
