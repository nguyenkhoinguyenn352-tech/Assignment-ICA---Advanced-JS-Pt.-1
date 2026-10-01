// Function to create a table row for a restaurant
const restaurantRow = (restaurant) => {
  const { name, company } = restaurant;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td>${company}</td>
  `;
  return tr;
};

// Function to create modal content for restaurant details and menu
const restaurantModal = (restaurant, menu) => {
  const { name, address, postalCode, city, phone, company } = restaurant;
  const { courses } = menu;

  let menuHtml = '<ul>';
  courses.forEach((menuItem) => {
    const { name: itemName, price, diets } = menuItem;
    const priceText = price ? `${price}€` : '?€';
    menuHtml += `<li>${itemName}, ${priceText}. ${diets}</li>`;
  });
  menuHtml += '</ul>';

  return `
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${postalCode}, ${city}</p>
    <p>${phone}</p>
    <p>${company}</p>
    ${menuHtml}
  `;
};

export { restaurantRow, restaurantModal };
