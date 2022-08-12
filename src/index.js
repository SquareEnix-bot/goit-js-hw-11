import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries'; // * це файлик з fetch
import { getRefs } from './getRefs'; // * тут лежать посилання на елементи
import { list, card } from './markup'; // * тут народжується HTML

var _debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', _debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(event) { // * власне мій інпут
  const inputValue = event.target.value;
  if (inputValue.length < 1) {
    inputValueEmpty();
  } else {
    API.fetchCountries(inputValue.trim())
      .then(renderMarkup)
      .catch(onFetchError);
  }
}

function renderMarkup(countries) { // * рендер розмітки
  if (countries.length > 10) {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.', { timeout: 2000 });
    return;
  } else if (countries.length === 1) {
    refs.countryList.innerHTML = '';
    return countries.map(country => refs.countryInfo.innerHTML = card(country));
  } else {
    refs.countryInfo.innerHTML = '';
    const markup = countries.map(country => list(country)).join('');
    return refs.countryList.innerHTML = markup;
  }
}

function onFetchError() { // * якщо ввести беліберду
  clearMarkup();
  Notify.failure('Oops, there is no country with that name', { timeout: 2000 });
}

function inputValueEmpty() { // * пустий інпут
  clearMarkup();
  Notify.failure('type something', { timeout: 2000 });
}

function clearMarkup() { // * очищення розмітки
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}