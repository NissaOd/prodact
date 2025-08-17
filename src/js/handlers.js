import iziToast from 'izitoast';
import { activeFirstBtn } from './helpers';
import { fetchCategories, fetchProducts } from './products-api';
import { renderCategories, renderProducts } from './render-function';

let currentPage = 1;

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
    renderProducts(result.products);
  } catch (err) {
    iziToast.error({
      message: err,
    });
  }
};
