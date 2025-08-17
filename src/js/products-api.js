// API ендпоінти:
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

import axios from 'axios';
import { BASE_URL, ENDPOINTS, PAGE_SIZE } from './constants';

axios.defaults.baseURL = BASE_URL;

export const fetchCategories = async () => {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
};

export const fetchProducts = async currentPage => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS}`, {
    params: {
      limit: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    },
  });
  return data;
};

export const fetchProductByCategory = async catName => {
  const { data } = await axios(`${ENDPOINTS.CATEGORY}${catName}`);
  return data;
};
