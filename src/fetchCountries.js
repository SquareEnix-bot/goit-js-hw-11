function fetchCountries(value) {
  return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
    .then(response => response.json());
}

export default { fetchCountries };