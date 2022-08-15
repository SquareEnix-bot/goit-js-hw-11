import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './getRefs';

export { firstFetch, onFetchError, inputValueEmpty, moreThanTotalHits };

const refs = getRefs();

function firstFetch(totalHits) { // * перший фетч  
  Notify.success(`Hooray! We found ${totalHits} images.`, { timeout: 2000 });
}

function onFetchError() { // * якщо ввести беліберду
  clearMarkup();
  Notify.failure('Sorry, there are no images matching your search query. Please try again.', { timeout: 2000 });
}

function inputValueEmpty() { // * пустий інпут
  clearMarkup();
  Notify.failure('You need to tell me which picture to look for.', { timeout: 2000 });
}

function moreThanTotalHits() { // * пустий інпут  
  Notify.info("We're sorry, but you've reached the end of search results.", { timeout: 2000 });
}

function clearMarkup() { // * очищення розмітки
  refs.galleryContainer.innerHTML = '';
}

