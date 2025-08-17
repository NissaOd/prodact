import iziToast from 'izitoast';
import { activeFirstBtn } from './helpers';
import { fetchCategories, fetchProducts } from './products-api';
import { renderCategories, renderProducts } from './render-function';
import { PAGE_SIZE } from './constants';
import { refs } from './refs';

let currentPage = 1;
let totalPages = 0;

export const getCategories = async () => {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);

    activeFirstBtn();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const result = await fetchProducts(currentPage);
    if (refs.loadMoreBtn.classList.contains('is-hidden')) {
      totalPages = Math.ceil(result.total / PAGE_SIZE);
      console.log(totalPages);
    }
    renderProducts(result.products);
    if (totalPages > currentPage) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else if (
      totalPages === currentPage &&
      !refs.loadMoreBtn.classList.contains('is-hidden')
    ) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (err) {
    iziToast.error({
      message: `${err}`,
    });
  }
};

export const loadMore = async () => {
  try {
    currentPage++;
    if (totalPages > currentPage) {
      const result = await fetchProducts(currentPage);
      renderProducts(result.products);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else if (
      totalPages === currentPage &&
      !refs.loadMoreBtn.classList.contains('is-hidden')
    ) {
      console.log(totalPages);
      const result = await fetchProducts(currentPage);
      renderProducts(result.products);
      refs.loadMoreBtn.classList.add('is-hidden');

      iziToast.warning({
        message: 'No more products available',
        messageColor: 'orangered',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
