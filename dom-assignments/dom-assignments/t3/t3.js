const target = document.querySelector('#target');

const userAgent = navigator.userAgent;
const platform = navigator.platform;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const availWidth = window.screen.availWidth;
const availHeight = window.screen.availHeight;

const now = new Date();
const dateFormatted = now.toLocaleDateString('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const timeFormatted = now.toLocaleTimeString('fi-FI', {
  hour: '2-digit',
  minute: '2-digit',
});

target.innerHTML = `
  <p>Browser name and version: ${userAgent}</p>
  <p>Operating system: ${platform}</p>
  <p>Screen width and height: ${screenWidth} x ${screenHeight}</p>
  <p>Available screen space: ${availWidth} x ${availHeight}</p>
  <p>Date: ${dateFormatted}</p>
  <p>Time: ${timeFormatted}</p>
`;
