import { getItems, removeItem, onItemsChanged } from './storage';
import { openModal } from './modal';

export function initSavedProducts(key) {
  const list = document.querySelector('.products');
  const empty = document.querySelector('.not-found');
  const error = document.createElement('p');
  error.setAttribute('role', 'alert');
  list.before(error);

  function render() {
    const items = getItems(key);
    list.replaceChildren();
    for (const product of items) {
      const item = document.createElement('li');
      item.className = 'products__item';
      item.dataset.id = product.id;
      const image = document.createElement('img');
      image.className = 'products__image';
      image.src = product.thumbnail || '';
      image.alt = product.title;
      const title = document.createElement('p');
      title.className = 'products__title';
      title.textContent = product.title;
      const price = document.createElement('p');
      price.className = 'products__price';
      price.textContent = `Price: $${product.price.toFixed(2)}`;
      const details = document.createElement('button');
      details.type = 'button';
      details.textContent = 'View details';
      details.addEventListener('click', () => openModal(product));
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent =
        key === 'cart' ? 'Remove from Cart' : 'Remove from Wishlist';
      remove.addEventListener('click', () => {
        try {
          removeItem(key, product.id);
          error.textContent = '';
        } catch {
          error.textContent =
            'Unable to save changes. Please allow browser storage and try again.';
        }
      });
      item.append(image, title, price, details, remove);
      list.append(item);
    }
    empty.classList.toggle('not-found--visible', items.length === 0);
    empty.querySelector('.not-found__title').textContent =
      key === 'cart' ? 'Your cart is empty' : 'Your wishlist is empty';
    empty.querySelector('.not-found__description').textContent =
      'Add products from the Home page to see them here.';
    if (key === 'cart') {
      document.querySelector('[data-count]').textContent = items.length;
      const cents = items.reduce(
        (sum, product) => sum + Math.round(product.price * 100),
        0
      );
      document.querySelector('[data-price]').textContent =
        `$${(cents / 100).toFixed(2)}`;
    }
  }

  onItemsChanged(render);
  render();
}
