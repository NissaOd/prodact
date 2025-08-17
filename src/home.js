//Логіка сторінки Home

import { getCategories, getProducts } from './js/handlers';
import { getProductById } from './js/modal';
import { refs } from './js/refs';

getCategories();

getProducts();
refs.productList.addEventListener('click', getProductById);
