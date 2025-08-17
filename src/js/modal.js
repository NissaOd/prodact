const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalImage = document.querySelector('.modal-product__img');
const modalTitle = document.querySelector('.modal-product__title');
const modalDescription = document.querySelector('.modal-product__description');
const modalPrice = document.querySelector('.modal-product__price');
const modalTags = document.querySelector('.modal-product__tags');

const productsList = document.querySelector('.products');

function fetchProductById(id) {
  return fetch(`https://dummyjson.com/products/${id}`).then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
}

function openModal(product) {
  modalImage.src = product.thumbnail;
  modalImage.alt = product.title;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = `$${product.price}`;

  modalTags.innerHTML = '';

  const tags = [product.category, product.brand];
  tags.forEach(tag => {
    const li = document.createElement('li');
    li.textContent = tag;
    modalTags.appendChild(li);
  });

  modal.classList.add('modal--is-open');
}

function closeModal() {
  modal.classList.remove('modal--is-open');
}

productsList.addEventListener('click', event => {
  const item = event.target.closest('.products__item');
  if (!item) return;

  const productId = item.dataset.id;

  fetchProductById(productId)
    .then(product => openModal(product))
    .catch(error => console.error('Error loading product:', error));
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});
