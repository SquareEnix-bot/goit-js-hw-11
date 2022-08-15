import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { firstFetch, onFetchError, inputValueEmpty, moreThanTotalHits } from './js/notify'; // * мої вспливашкі
import { getRefs } from './js/getRefs'; // * тут лежать посилання на елементи
import { img } from './js/markup'; // * тут народжується HTML

import NewPicturesAPI from './js/picturesApi'; // * це файлик з fetch
import LoadMoreBtn from './js/loadMoreBtn';


var _debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const newPicturesAPI = new NewPicturesAPI();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

function onSearch(event) { // * це клік на сабміт
  event.preventDefault();

  const inputValue = event.currentTarget.elements.searchQuery.value;
  newPicturesAPI.query = inputValue;
  newPicturesAPI.resetPage();

  if (inputValue.length < 1) {
    console.log('error');
    inputValueEmpty();
  } else {
    loadMoreBtn.show();
    clearMarkup();
    fetchPictures();
  }
}

let counterVal = 0; // * всім костилям костиль

function onLoadMoreBtn() {
  incrementClick();

  if (counterVal === 13) {
    moreThanTotalHits();
    loadMoreBtn.done();
    return;
  } else {
    fetchPictures();
  }
}

function incrementClick() {
  counterVal += 1;
  console.log('counterVal: ', counterVal);

}

function fetchPictures() {
  loadMoreBtn.disable();
  newPicturesAPI.fetchPictures()
    .then(pictures => {
      renderMarkup(pictures);
      let gallery = new SimpleLightbox('.gallery a', {});
      loadMoreBtn.enable();
      if (newPicturesAPI.page > 2) {
        scrollBy();
      }
    })
    .catch(onFetchError);
}

function renderMarkup(pictures) { // * рендер розмітки  

  if (pictures.hits.length < 1) { // * це пустий інпут
    onFetchError();
    return;
  }

  if (newPicturesAPI.page === 2) { // * вспливашка кількості зображень
    firstFetch(pictures.totalHits);
  }

  const markup = pictures.hits.map(picture => img(picture)).join('');
  return refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function scrollBy() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

function clearMarkup() { // * очищення розмітки
  refs.galleryContainer.innerHTML = '';
}