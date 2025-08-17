//Логіка сторінки Home

import { getProductById } from './js/modal';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from './js/handlers';

import { refs } from './js/refs';

getCategories();
getProducts();

refs.productList.addEventListener('click', getProductById);


refs.categoryList.addEventListener('click', getProductsByCategory);

