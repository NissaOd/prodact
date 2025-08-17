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
    totalPages = result.total / PAGE_SIZE;
    renderProducts(result.products);
    if (totalPages > currentPage) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else if (totalPages === currentPage) {
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
    if (totalPages > 1) {
      currentPage++;
      const result = await fetchProducts(currentPage);
      renderProducts(result.products);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else if (totalPages === currentPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
      const result = await fetchProducts(currentPage);
      renderProducts(result.products);
      iziToast.warning({
        message: 'No more products available',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
