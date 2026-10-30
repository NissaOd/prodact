export const STORAGE_KEYS = ['cart', 'wishlist'];

export function getItems(key) {
  try {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(items)) return [];
    return items
      .filter(
        item =>
          item &&
          Number.isInteger(item.id) &&
          item.id > 0 &&
          typeof item.title === 'string' &&
          Number.isFinite(item.price) &&
          item.price >= 0
      )
      .filter(
        (item, index, all) =>
          all.findIndex(other => other.id === item.id) === index
      );
  } catch {
    return [];
  }
}

export function hasItem(key, id) {
  return getItems(key).some(item => item.id === Number(id));
}

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event('products:changed'));
}

export function addItem(key, product) {
  const items = getItems(key);
  if (!items.some(item => item.id === product.id)) {
    saveItems(key, [...items, product]);
  }
}

export function removeItem(key, id) {
  saveItems(
    key,
    getItems(key).filter(item => item.id !== Number(id))
  );
}

export function onItemsChanged(callback) {
  window.addEventListener('products:changed', callback);
  window.addEventListener('storage', event => {
    if (event.key === null || STORAGE_KEYS.includes(event.key)) callback();
  });
}

export function updateCounters() {
  for (const key of STORAGE_KEYS) {
    document.querySelectorAll(`[data-${key}-count]`).forEach(element => {
      element.textContent = getItems(key).length;
    });
  }
}
