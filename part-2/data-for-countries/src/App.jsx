import { useState, useEffect } from "react";
import axios from "axios";

// import CountryData from "./components/CountryData";
import SearchBar from "./components/SearchBar";
import View from "./components/View";

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
  // const regex = new RegExp(`${filter}`, "i");


  // UseEffects

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
        console.error(error);
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
  
  useEffect(() => {
    if (showFilter && countries) {
      const newFilteredCountries = isValidRegex(filter)
        ? countries.filter((country) => (new RegExp(`${filter}`, "i")).test(country.name.common))
        : [];
      setFilteredCountries(newFilteredCountries); 
    } else {
      setFilteredCountries([]); // Set to an empty array if showFilter is false or countries is null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter, countries, filter]);
  

  // Functions/handlers

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


  const handleShowCountryData = (countryName) => {
    const newIndex = filteredCountries.findIndex(country => country.name.common === countryName);
    setIndex(newIndex);
    setLatlng({ lat: filteredCountries[newIndex].latlng[0], lng: filteredCountries[newIndex].latlng[1] });
    setShowCountryData(true);
  };

  const isValidRegex = (query) => {
    try {
      new RegExp(`${query}`, "i");
      return true; // No syntax errors, so it's a valid regex
    } catch (error) {
      return false; // Syntax error, so it's not a valid regex
    }
  };


  return (
    <>
    <div className="container">
      <SearchBar filter={filter} handleFilter={handleFilter}/>
      <View 
      viewCountry={showCountryData} 
      countries={countries} 
      filteredCountries={filteredCountries}
      handleShowCountryData={handleShowCountryData}
      weather={weather}
      index={index}
      visibility={visibility}
      length={filteredCountries.length}
      />
    </div>
    <footer>Built with Love <span>❤</span> by <a href="https://twitter.com/hayats_codes" target="_blank" rel="noreferrer">HayatsCodes</a></footer>
    </>
  );
};

export default App;
