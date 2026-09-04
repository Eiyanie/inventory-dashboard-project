// display.js
// All DOM-rendering logic lives here. main.js calls these functions with
// data produced by inventoryUtils.js.

import { getStockStatus } from "./inventoryUtils.js";

const productListEl = document.getElementById("productList");
const noResultsMessageEl = document.getElementById("noResultsMessage");
const totalInventoryValueEl = document.getElementById("totalInventoryValue");
const lowStockCountEl = document.getElementById("lowStockCount");
const outOfStockCountEl = document.getElementById("outOfStockCount");

/**
 * Format a raw number as Philippine peso currency for display only.
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  return `₱${value.toLocaleString("en-PH")}`;
}

/**
 * Map a stock-status label to the short modifier class used by
 * .status-badge (status-in / status-low / status-out).
 * @param {string} status
 * @returns {string}
 */
function getStatusModifier(status) {
  if (status === "In Stock") return "in";
  if (status === "Low Stock") return "low";
  return "out";
}

/**
 * Render the given products as product cards inside #productList.
 * Shows the "No products found" message when the array is empty.
 * @param {Array<Object>} products
 */
export function displayProducts(products) {
  productListEl.innerHTML = "";

  if (products.length === 0) {
    noResultsMessageEl.textContent = "No products found";
    noResultsMessageEl.style.display = "block";
    return;
  }

  noResultsMessageEl.style.display = "none";
  noResultsMessageEl.textContent = "";

  products.forEach((product) => {
    const { id, name, category, price, stock } = product;
    const status = getStockStatus(stock);
    const statusModifier = getStatusModifier(status);

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3 class="product-card__name">${name}</h3>
      <p class="product-card__category">${category}</p>
      <dl class="product-card__details">
        <div>
          <dt>Price</dt>
          <dd>${formatCurrency(price)}</dd>
        </div>
        <div>
          <dt>Stock</dt>
          <dd>${stock}</dd>
        </div>
      </dl>
      <span class="status-badge status-${statusModifier}">${status}</span>
    `;

    productListEl.appendChild(card);
  });
}

/**
 * Render the summary values (total inventory value, low-stock and
 * out-of-stock counts).
 * @param {number} totalValue
 * @param {number} lowStockCount
 * @param {number} outOfStockCount
 */
export function displaySummary(totalValue, lowStockCount, outOfStockCount) {
  totalInventoryValueEl.textContent = formatCurrency(totalValue);
  lowStockCountEl.textContent = lowStockCount;
  outOfStockCountEl.textContent = outOfStockCount;
}
