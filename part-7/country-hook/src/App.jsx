/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState({});

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data));
  }, []);

  useEffect(() => {
    const regex = new RegExp(`${name}`, "i");
    const filteredCountries = countries.length >= 1 ? countries.filter(singleCountry => {
      return regex.test(singleCountry.name.common)
    }): []

    if (filteredCountries.length !== 1) {
      setCountry({
        found: false,
        data: {}
      });
    } else {
      setCountry({
        found: true,
        data: {
          name: filteredCountries[0].name.common,
          capital: filteredCountries[0].capital,
          population: filteredCountries[0].population,
          flag: filteredCountries[0].flags.png
        }
      });
    }
  }, [countries, name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App