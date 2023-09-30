/* eslint-disable react/prop-types */
const CountryData = ({ countries, index, weather }) => {

   

    return (
        <div>
            {console.log('Current weather: ', weather)}
              <h1>{countries[index].name.official}</h1>
              <p>Name: {countries[index].name.common}</p>
              <p>Capital: {countries[index].capital[index]}</p>
              <p>Area: {countries[index].area}</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(countries[index].languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img
                src={countries[index].flags.png}
                alt={countries[index].flags.alt}
              />
              {
                weather ? (<div>
                    <h2>Weather in {countries[index].name.common}</h2>
              <p>Temmperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.description} />
              <p>Wind: {weather.wind.speed}m/s</p>
                </div>) : <p>Loading weather data...</p>
              }
            </div>
    )
}

export default CountryData