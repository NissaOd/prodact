import iziToast from 'izitoast';
import { activeFirstBtn } from './helpers';
import {
  fetchCategories,
  fetchProductByCategory,
  fetchProducts,
} from './products-api';
import { clearHTML, renderCategories, renderProducts } from './render-function';

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

export const getProductsByCategory = async e => {
  if (e.target.nodeName !== 'BUTTON') return;
  try {
    const catName = e.target.textContent;
    const data = await fetchProductByCategory(catName);
    clearHTML();
    renderProducts(data.products);
  } catch (error) {
    console.log(error);
  }
};
