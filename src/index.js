import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { firstFetch, onFetchError, inputValueEmpty, moreThanTotalHits } from './js/notify'; // * мої вспливашкі
import { getRefs } from './js/getRefs'; // * тут лежать посилання на елементи
import { img } from './js/markup'; // * тут народжується HTML

import NewPicturesAPI from './js/picturesApi'; // * це файлик з fetch
import LoadMoreBtn from './js/loadMoreBtn';

const refs = getRefs();

const newPicturesAPI = new NewPicturesAPI();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

let counterVal = 0; // * всім костилям костиль

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

function onSearch(event) { // * це клік на сабміт
  event.preventDefault();

  const inputValue = event.currentTarget.elements.searchQuery.value;
  newPicturesAPI.query = inputValue;
  newPicturesAPI.resetPage();

  if (inputValue.length === 0) {
    inputValueEmpty();
    return;
  }

  clearMarkup();
  fetchPictures();
}

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
}

async function fetchPictures() {
  loadMoreBtn.show();
  loadMoreBtn.disable();
  await newPicturesAPI.fetchPictures()
    .then(pictures => {
      if (pictures.hits.length < 1) { // * введення нісенітниці
        onFetchError();
        return;
      }
      renderMarkup(pictures);
      let gallery = new SimpleLightbox('.gallery a', {});
      if (pictures.hits.length < 40) { // * якщо картинок менше ніж 40
        loadMoreBtn.done();
      } else {
        loadMoreBtn.enable();
      }
      if (newPicturesAPI.page > 2) {
        scrollBy();
      }
    });
}

function renderMarkup(pictures) { // * рендер розмітки
  if (newPicturesAPI.page === 2) { // * вспливашка кількості зображень
    firstFetch(pictures.totalHits);
  }

  const markup = pictures.hits.map(picture => img(picture)).join('');
  return refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function scrollBy() { // * скрол
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