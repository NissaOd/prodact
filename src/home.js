//Логіка сторінки Home

import { getProductById } from './js/modal';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  loadMore,
} from './js/handlers';

import { refs } from './js/refs';

getCategories();
getProducts();

refs.loadMoreBtn.addEventListener('click', loadMore);
refs.productList.addEventListener('click', getProductById);

refs.categoryList.addEventListener('click', getProductsByCategory);
