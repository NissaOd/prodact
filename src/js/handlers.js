import { activeFirstBtn } from './helpers';
import { fetchCategories } from './products-api';
import { renderCategories } from './render-function';

export const getCategories = async () => {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);

    activeFirstBtn();
  } catch (error) {
    console.log(error);
  }
};
