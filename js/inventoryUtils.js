// inventoryUtils.js
// Reusable, pure functions that process the products array.
// None of these functions touch the DOM — they only take data in and
// return data out, so they can be tested independently and reused by
// display.js / main.js.

/**
 * Search products by name (case-insensitive, partial match).
 * @param {Array<Object>} products
 * @param {string} query
 * @returns {Array<Object>}
 */
export function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Filter products by category. "All" returns every product.
 * @param {Array<Object>} products
 * @param {string} category
 * @returns {Array<Object>}
 */
export function filterProductsByCategory(products, category) {
  if (category === "All") {
    return products;
  }
  return products.filter((product) => product.category === category);
}

/**
 * Return the stock-status label for a given stock quantity.
 * 0 -> "Out of Stock", 1-5 -> "Low Stock", 6+ -> "In Stock".
 * @param {number} stock
 * @returns {string}
 */
export function getStockStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  }
  if (stock >= 1 && stock <= 5) {
    return "Low Stock";
  }
  return "In Stock";
}

/**
 * Calculate the total inventory value (price * stock for every product).
 * @param {Array<Object>} products
 * @returns {number}
 */
export function calculateTotalInventoryValue(products) {
  return products.reduce((total, { price, stock }) => total + price * stock, 0);
}

/**
 * Count how many products have low stock (1 to 5 units).
 * @param {Array<Object>} products
 * @returns {number}
 */
export function countLowStockProducts(products) {
  return products.filter(({ stock }) => stock >= 1 && stock <= 5).length;
}

/**
 * Count how many products are out of stock (0 units).
 * @param {Array<Object>} products
 * @returns {number}
 */
export function countOutOfStockProducts(products) {
  return products.filter(({ stock }) => stock === 0).length;
}
