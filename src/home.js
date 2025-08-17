//Логіка сторінки Home

import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from './js/handlers';
import { refs } from './js/refs';

getCategories();
getProducts();

refs.categoryList.addEventListener('click', getProductsByCategory);
