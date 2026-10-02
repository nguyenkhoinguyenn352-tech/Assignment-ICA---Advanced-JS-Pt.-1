import { fetchData } from './utils.js';
import { baseUrl } from './variables.js';
import { restaurantRow, restaurantModal } from './components.js';

const targetTable = document.querySelector('table');
const modal = document.querySelector('dialog');

let allRestaurants = [];

// Create UI controls (filter buttons & error box) dynamically
const createFilterUI = () => {
  const container = document.createElement('div');
  container.className = 'filter-container';
  container.style.margin = '10px 0';

  container.innerHTML = `
    <div id="error-message" style="color: red; display: none; margin-bottom: 10px;"></div>
    <div class="filter-buttons">
      <button id="filter-sodexo">Sodexo</button>
      <button id="filter-compass">Compass</button>
      <button id="filter-all">Show All</button>
    </div>
  `;

  if (targetTable && targetTable.parentNode) {
    targetTable.parentNode.insertBefore(container, targetTable);
  }
};

// Helper to show errors
const showError = (message) => {
  const errorContainer = document.querySelector('#error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  } else {
    console.error(message);
  }
};

// Render restaurant rows using map and forEach
const renderRestaurants = (restaurantList) => {
  if (!targetTable) return;

  try {
    const tbody = targetTable.querySelector('tbody') || targetTable;
    tbody.innerHTML = '';

    if (!restaurantList || restaurantList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3">No restaurants found.</td></tr>';
      return;
    }

    // Refactored: functional approach using map & forEach
    const rows = restaurantList.map((restaurant) => {
      const row = restaurantRow(restaurant);

      row.addEventListener('click', async () => {
        try {
          const menu = await fetchData(`${baseUrl}/restaurants/daily/${restaurant._id}/fi`);
          if (modal) {
            modal.innerHTML = restaurantModal(restaurant, menu);
            modal.showModal();
          }
        } catch (error) {
          showError(`Failed to load menu: ${error.message}`);
        }
      });

      return row;
    });

    rows.forEach((row) => tbody.appendChild(row));
  } catch (error) {
    showError(`Error rendering list: ${error.message}`);
  }
};

// Filter restaurants using filter() and arrow function
const filterRestaurants = (provider) => {
  try {
    if (!allRestaurants || allRestaurants.length === 0) {
      throw new Error('No restaurant data available.');
    }

    if (provider === 'all') {
      renderRestaurants(allRestaurants);
    } else {
      const filtered = allRestaurants.filter(
        (restaurant) =>
          restaurant.company &&
          restaurant.company.toLowerCase() === provider.toLowerCase()
      );
      renderRestaurants(filtered);
    }
  } catch (error) {
    showError(`Filtering error: ${error.message}`);
  }
};

// Attach event listeners for filter buttons using forEach
const setupEventListeners = () => {
  const buttons = [
    { id: '#filter-sodexo', provider: 'Sodexo' },
    { id: '#filter-compass', provider: 'Compass' },
    { id: '#filter-all', provider: 'all' },
  ];

  buttons.forEach(({ id, provider }) => {
    const btn = document.querySelector(id);
    if (btn) {
      btn.addEventListener('click', () => filterRestaurants(provider));
    }
  });
};

// Main execution function
const main = async () => {
  try {
    createFilterUI();
    setupEventListeners();

    allRestaurants = await fetchData(`${baseUrl}/restaurants`);

    // Sort alphabetically by name
    allRestaurants.sort((a, b) => a.name.localeCompare(b.name));

    renderRestaurants(allRestaurants);
  } catch (error) {
    showError(`Failed to fetch restaurant list: ${error.message}`);
  }
};

main();
