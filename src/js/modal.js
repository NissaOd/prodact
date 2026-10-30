import {
  addItem,
  removeItem,
  hasItem,
  onItemsChanged,
  updateCounters,
} from './storage';

const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalProduct = document.querySelector('.modal-product');
const cartButton = document.querySelector('.modal-product__btn--cart');
const wishlistButton = document.querySelector('.modal-product__btn--wishlist');
const status = document.createElement('p');
status.setAttribute('role', 'alert');
modalProduct.after(status);
let currentProduct = null;

function updateButtons() {
  if (!currentProduct) return;
  cartButton.textContent = hasItem('cart', currentProduct.id)
    ? 'Remove from Cart'
    : 'Add to Cart';
  wishlistButton.textContent = hasItem('wishlist', currentProduct.id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';
}

function toggleProduct(key) {
  if (!currentProduct) return;
  try {
    if (hasItem(key, currentProduct.id)) removeItem(key, currentProduct.id);
    else addItem(key, currentProduct);
    status.textContent = '';
  } catch {
    status.textContent =
      'Unable to save changes. Please allow browser storage and try again.';
  }
}

export function openModal(product) {
  currentProduct = product;
  status.textContent = '';
  const image = document.createElement('img');
  image.className = 'modal-product__img';
  image.src = product.thumbnail || '';
  image.alt = product.title;
  const content = document.createElement('div');
  content.className = 'modal-product__content';
  const fields = {
    title: product.title,
    tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    description: product.description,
    'shipping-information':
      product.shippingInformation && `Shipping: ${product.shippingInformation}`,
    'return-policy':
      product.returnPolicy && `Return Policy: ${product.returnPolicy}`,
    price: `Price: $${product.price.toFixed(2)}`,
  };
  for (const [name, value] of Object.entries(fields)) {
    const element = document.createElement('p');
    element.className = `modal-product__${name}`;
    element.textContent = value || '';
    content.append(element);
  }
  modalProduct.replaceChildren(image, content);
  updateButtons();
  modal.classList.add('modal--is-open');
}

function closeModal() {
  modal.classList.remove('modal--is-open');
}

export function getProductById(event) {
  const item = event.target.closest('.products__item');
  if (!item) return;
  fetch(`https://dummyjson.com/products/${item.dataset.id}`)
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .then(openModal)
    .catch(error => console.error('Error loading product:', error));
}

cartButton.addEventListener('click', () => toggleProduct('cart'));
wishlistButton.addEventListener('click', () => toggleProduct('wishlist'));
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});
onItemsChanged(() => {
  updateCounters();
  updateButtons();
});
updateCounters();
