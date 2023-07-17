import { Notify } from 'notiflix';
import { galleryEl } from './js/markup.js';
import { fetchImages, totalPage, totalHits } from './js/fetch-api';
import { createMarkup, galleryEl } from './js/markup';
let query = '';
let page = 1;
const per_page = 40;
let totalPage = 0;
let totalHits = 0;

const searchFormEl = document.querySelector('.search-form');

searchFormEl.addEventListener('submit', searchHandler);

function searchHandler(event) {
  event.preventDefault();
  page = 1;
  galleryEl.innerHTML = '';

  query = searchFormEl.firstElementChild.value.trim();

  if (query === '') {
    Notify.warning('Please, input your query!');
    return;
  }

  fetchImages(query, page, per_page);
  searchFormEl.reset();
}

function scrollHandler() {
  if (page === totalPage) {
    window.removeEventListener('scroll', scrollHandler);
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  if (totalHits > per_page) {
    if (infinityScroll()) {
      page += 1;

      fetchImages(query, page, per_page);
    }
  }
}

function infinityScroll(page) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    return true;
  }
}

export { scrollHandler };
