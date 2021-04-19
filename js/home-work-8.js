import images from './galery-items.js';

const galeryContainer = document.querySelector('ul.gallery');
const lightboxEl = document.querySelector('.lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const btnEl = document.querySelector('[data-action="close-lightbox"]');
const modalEl = document.querySelector('.lightbox__content');
const modalOverleyEl = document.querySelector('.lightbox__overlay');

const imgCardsMarkup = makeImageCardsMarkup(images);
galeryContainer.insertAdjacentHTML('beforeend', imgCardsMarkup);

console.log(galeryContainer);

function makeImageCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link" ${original}
    
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>
    `;
    })
    .join('');
}

galeryContainer.addEventListener('click', onImageCardClick);
btnEl.addEventListener('click', onBtnModalClose);
modalOverleyEl.addEventListener('click', onModalOvereleyClose);
window.addEventListener('keydown', onEscapeModalClose);

function onImageCardClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = evt.target.getAttribute('data-source');
  lightboxImageEl.alt = evt.target.alt;
}

function onBtnModalClose() {
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}

function onModalOvereleyClose(evt) {
  if (evt.target === evt.currentTarget) {
    onBtnModalClose();
  }
}

function onEscapeModalClose(evt) {
  if (evt.code === 'Escape') {
    onBtnModalClose();
  }
}
