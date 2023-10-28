/* eslint-disable react/prop-types */
const CountryData = ({ countries, index, weather }) => {
  if (!countries) {
    console.log("no country");
    return <p>Loading...</p>;
  }

  return (
    <div className="country-view">
      <h2>{countries[index].name.common}</h2>
      <div className="country-view-content">
        <h3> Official Name</h3>
        <p>{countries[index].name.official}</p>
      </div>
      <div className="country-view-content">
        <h3>Capital</h3>
        <p>{countries[index].capital ? countries[index].capital[0]: 'No Capital'}</p>
      </div>
      <div className="country-view-content">
        <h3>Area</h3>
        <p>{countries[index].area} Km²</p>
      </div>
      <div className="country-view-content">
        <h3>Languages</h3>
        <ul>
          {Object.values(countries[index].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div className="country-view-content">
        <h3 className="flag">Flag</h3>
        <img
          src={countries[index].flags.png}
          alt={countries[index].flags.alt}
        />
      </div>

      <div className="country-view-content"></div>
      {weather ? (
        <div className="weather-widget country-view-content">
          <h3 className="real-time-weather">Real-time Weather</h3>
          <h4>Temperature</h4>
          <p>{(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
          <h4 className="weather-description">
            {weather.weather[0].description}
          </h4>
          <img
            className="weather-img"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <h4 className="wind">Wind</h4>
          <p>{weather.wind.speed}m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryData;
