//Логіка сторінки Home

import { getCategories, getProducts, loadMore } from './js/handlers';
import { refs } from './js/refs';

getCategories();

getProducts();

refs.loadMoreBtn.addEventListener('click', loadMore);
