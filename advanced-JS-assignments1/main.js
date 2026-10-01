import { baseUrl } from './variables.js';
import { fetchData } from './utils.js';
import { restaurantRow, restaurantModal } from './components.js';

const targetTable = document.querySelector('table');
const modal = document.querySelector('dialog');

const main = async () => {
  try {
    // Fetch restaurant list
    const restaurants = await fetchData(`${baseUrl}/restaurants`);

    // Sort restaurants alphabetically by name
    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    // Render each restaurant row
    restaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);

      // Add click event listener to display menu modal
      row.addEventListener('click', async () => {
        try {
          const menu = await fetchData(`${baseUrl}/restaurants/daily/${restaurant._id}/fi`);
          modal.innerHTML = restaurantModal(restaurant, menu);
          modal.showModal();
        } catch (error) {
          console.error('Error fetching menu:', error);
        }
      });

      targetTable.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }
};

main();
