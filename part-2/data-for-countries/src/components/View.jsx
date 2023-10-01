/* eslint-disable react/prop-types */
import CountryData from "./CountryData";

const View = ({
  length,
  filteredCountries,
  index,
  weather,
  viewCountry,
  countries,
  visibility,
  handleShowCountryData
}) => {
  if (!viewCountry) {
    if (!countries) {
      return <p className="hidden {}">Loading...</p>;
    } else {
      if (length === 0) {
        return (
          <p className="invalid-search">
            No match found, specify another filter
          </p>
        );
      } else if (length === 1) {
        return (
          <>
            <CountryData
              countries={filteredCountries}
              index={0}
              weather={weather}
            />
          </>
        );
      } else {
        if (length > 1 && length <= 10) {
          return (
            <div className={`search-results ${visibility}`}>
              {filteredCountries.map((country) => (
                <div key={country.name.common} className="search-result">
                  <p>{country.name.common}</p>
                  <button
                    className="btn"
                    onClick={() => handleShowCountryData(country.name.common)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <p className="invalid-search">
              Too many matches, specify another filter
            </p>
          );
        }
      }
    }
  } else {
    return (
        <CountryData countries={filteredCountries} index={index} weather={weather}/>
    )
  }
};

export default View;
