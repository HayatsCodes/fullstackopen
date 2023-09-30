import { useState, useEffect } from "react";
import axios from "axios";

import CountryData from "./components/CountryData";

const App = () => {

  const [countries, setCountries] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [index, setIndex] = useState(0);
  const [showCountryData, setShowCountryData] = useState(false);
  const [latlng, setLatlng] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY

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
  }, [latlng])


  const handleFilter = (event) => {
    setFilter(event.target.value);


    if (showCountryData) {
      setShowCountryData(false)
    }
    if (!event.target.value) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  const regex = new RegExp(`${filter}`, "i");
  const filteredCountries = showFilter && countries
    ? countries.filter((country) => regex.test(country.name.common))
    : [];


  const handleShowCountryData = (countryName) => {
    const newIndex = filteredCountries.findIndex(country => country.name.common === countryName)
    setIndex(newIndex)
    setLatlng({lat: filteredCountries[newIndex].latlng[0], lng: filteredCountries[newIndex].latlng[1]})
    setShowCountryData(true)
  }

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilter} />
      </div>
      {!showCountryData
      ? (<div>log
        {!countries ? <p>Loading...</p> : 
        filteredCountries.length > 10 
        ? (
          <p>Too many matches, specify another filter</p>
        )
        : filteredCountries.length !== 1
          ? (
            filteredCountries.map((country) => (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => handleShowCountryData(country.name.common)}>Details</button>
              </div>
            ))
          ) 
          : (<>
              {/* {setLat(filteredCountries[0].latlng[0])}
              {setLng(filteredCountries[0].latlng[1])} */}
              <CountryData countries={filteredCountries} index={index} weather={weather}/>
            </>
            
          )}
        </div>)
      : <CountryData countries={filteredCountries} index={index} weather={weather}/>

      }
      
    </div>
  );
};

export default App;
