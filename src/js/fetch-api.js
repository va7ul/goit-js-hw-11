import axios from 'axios';
import { Notify } from 'notiflix';

import { scrollHandler } from '../index';
import { createMarkup } from './markup';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38290749-a2ba3d07cb211d325e34a4328';



 function fetchImages(query, page, per_page) {
  const options = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: `${page}`,
    per_page: `${per_page}`,
  });

  return axios
    .get(`?${options}`)
    .then(response => {
      const hits = response.data.hits;
      total = response.data.total;
      totalHits = response.data.totalHits;
      totalPage = Math.ceil(totalHits / per_page);

      window.addEventListener('scroll', scrollHandler);

      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (page === 1) {
        Notify.success(`Hooray! We found ${total} images.`);
      }

      createMarkup(hits);
    })
    .catch(err => {
      Notify.failure(err.message);
    });
}

export { fetchImages, totalHits, totalPage };
