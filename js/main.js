// main.js
// Entry point: wires up the data, utility, and display modules, and
// coordinates user interaction (search, filter, reset).

import { products } from "./products.js";
import {
  searchProducts,
  filterProductsByCategory,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts,
} from "./inventoryUtils.js";
import { displayProducts, displaySummary } from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Apply the current search text and category filter to the full
 * products list, then re-render the product cards.
 * The summary values are always calculated from the full inventory,
 * not the filtered results.
 */
function applyFilters() {
  const query = searchInput.value;
  const category = categoryFilter.value;

  let result = searchProducts(products, query);
  result = filterProductsByCategory(result, category);

  displayProducts(result);
}

/**
 * Render the summary section using the full, unfiltered inventory.
 */
function renderSummary() {
  const totalValue = calculateTotalInventoryValue(products);
  const lowStockCount = countLowStockProducts(products);
  const outOfStockCount = countOutOfStockProducts(products);

  displaySummary(totalValue, lowStockCount, outOfStockCount);
}

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "All";
  displayProducts(products);
}

function init() {
  displayProducts(products);
  renderSummary();

  searchBtn.addEventListener("click", applyFilters);
  resetBtn.addEventListener("click", resetFilters);

  // Bonus: allow pressing Enter in the search box to trigger a search.
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  });

  categoryFilter.addEventListener("change", applyFilters);
}

document.addEventListener("DOMContentLoaded", init);
