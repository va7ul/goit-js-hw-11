import './css/styles.css';
import { fetchImages } from './fetchImages'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let search = '';
let page = 1;
let lightbox = '';

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const guard = document.querySelector(".js-guard");

const options = {
    root: null,
    rootMargin: '300px',
    threshold: 1.0,
}

const observe = new IntersectionObserver(onAddImages, options)

form.addEventListener("submit", onSubmit);

async function onSubmit(evt) {
    evt.preventDefault();
    clearMarkup();

    search = evt.currentTarget.searchQuery.value.trim();
    if (search) {
        await fetchImages(search).then(data => { createImages(data.hits); observe.observe(guard); Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`) })
        .catch(() => Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
    }
}

function clearMarkup() {
    observe.unobserve(guard);
    gallery.innerHTML = '';
}

function createImages(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
            <a class="gallery__item" href="${largeImageURL}">
                <img src="${webformatURL}" title="${tags}" loading="lazy" width="400px" height="250px"/>
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>`).join('');
    gallery.insertAdjacentHTML('beforeend', markup)

    lightbox = new SimpleLightbox('.photo-card a', { captionDelay: 250, overlayOpacity: 0.5 });
}

function onAddImages(entries, observe) {
        entries.forEach((entry) => {
        if(entry.isIntersecting){
            page+=1
            fetchImages(search, page).then(data => {
                createImages(data.hits);
                lightbox.refresh();
                if(page === 13){
                    observe.unobserve(guard)
                }
            })
        }
    })
}