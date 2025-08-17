const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalProduct = document.querySelector(`.modal-product`);

const productsList = document.querySelector('.products');

function fetchProductById(id) {
  return fetch(`https://dummyjson.com/products/${id}`).then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  });
}

function openModal(product) {
  const markApp = `<img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">${product.tags}</ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${product.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${product.returnPolicy}</p>
        <p class="modal-product__price">Price: $${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>

 `;

  modalProduct.innerHTML = markApp;
  modal.classList.add('modal--is-open');
}

function closeModal() {
  modal.classList.remove('modal--is-open');
}

export function getProductById(event) {
  const item = event.target.closest('.products__item');
  if (!item) return;

  const productId = item.dataset.id;

  fetchProductById(productId)
    .then(product => openModal(product))
    .catch(error => console.error('Error loading product:', error));
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});
