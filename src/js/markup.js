import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

function createMarkup(data) {
  const card = data
    .map(item => {
      return `  
  <a class = "gallery__link" href="${item.largeImageURL}">
  <img class = "gallery__image" src="${item.webformatURL}" alt="${item.tags}" title=""/>
  <div class="photo-card gallery__item">
    <div class="info">
     <p class="info-item">
      <b>Likes: ${item.likes}</b>
     </p>
     <p class="info-item">
      <b>Views: ${item.views}</b>
     </p>
     <p class="info-item">
      <b>Comments: ${item.comments}</b>
     </p>
     <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
     </p>
   </div>
 </div>
 </a>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', card);

  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export { createMarkup, galleryEl };
