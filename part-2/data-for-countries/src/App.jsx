import { useState, useEffect } from "react";
import axios from "axios";

import CountryData from "./components/CountryData";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [index, setIndex] = useState(0);
  const [showCountryData, setShowCountryData] = useState(false);
  const [latlng, setLatlng] = useState(null);
  const [weather, setWeather] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [visibility, setVisibility] = useState("hidden");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const renderedCountry = filteredCountries[0];
      setLatlng({ lat: renderedCountry.latlng[0], lng: renderedCountry.latlng[1] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCountries.length]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (latlng) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=${API_KEY}`)
      .then(response => setWeather(response.data))
      .catch(error => {console.error(error)})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latlng]);

  const handleFilter = (event) => {
    setFilter(event.target.value);

    if (showCountryData) {
      setShowCountryData(false);
    }
    if (!event.target.value) {
      setVisibility('hidden')
      setShowFilter(false);
    } else {
      setVisibility('show')
      setShowFilter(true);
    }
  };

  const regex = new RegExp(`${filter}`, "i");
  
  useEffect(() => {
    const newFilteredCountries = showFilter && countries
      ? countries.filter((country) => regex.test(country.name.common))
      : [];
    setFilteredCountries(newFilteredCountries); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter, countries, filter]);

  const handleShowCountryData = (countryName) => {
    const newIndex = filteredCountries.findIndex(country => country.name.common === countryName);
    setIndex(newIndex);
    setLatlng({ lat: filteredCountries[newIndex].latlng[0], lng: filteredCountries[newIndex].latlng[1] });
    setShowCountryData(true);
  };


  return (
    <>
    <div className="container">
      <SearchBar filter={filter} handleFilter={handleFilter}/>
      {!showCountryData
      ? (<div>
        {!countries ? <p className="hidden {}">Loading...</p> : 
        filteredCountries.length > 10 
        ? (
          <p className="invalid-search">Too many matches, specify another filter</p>
        )
        : filteredCountries.length !== 1
          ? (
            <div className={`search-results ${visibility}`}>
            {filteredCountries.map((country) => (
              <div key={country.name.common} className="search-result">
                <p>{country.name.common}</p>
                <button className="btn" onClick={() => handleShowCountryData(country.name.common)}>View</button>
              </div>
            ))}
          </div>
          ) 
          : (<>
              <CountryData countries={filteredCountries} index={index} weather={weather}/>
            </>
          )}
        </div>)
      : <CountryData countries={filteredCountries} index={index} weather={weather}/>

      }
    </div>
    <footer>Built with Love <span>❤</span> by <a href="https://twitter.com/hayats_codes" target="_blank" rel="noreferrer">HayatsCodes</a></footer>
    </>
  );
};

export default App;
