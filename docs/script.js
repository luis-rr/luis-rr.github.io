// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Light/dark theme toggle. The choice is remembered for the next visit;
// the saved theme is applied early by a small script in the <head> of index.html.
const themeButton = document.querySelector('.theme-toggle');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}

setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('theme', theme); } catch (e) {}
});


// CV map: hovering a CV entry highlights it and its city dot(s) on the map;
// hovering a dot highlights it and all CV entries in that city.
// Entries and dots are linked by data-place names (an entry can list several).
const placeItems = [...document.querySelectorAll('[data-place]')];
const isDot = item => item.tagName === 'circle';

placeItems.forEach(source => {
  const places = source.dataset.place.split(' ');
  const targets = placeItems.filter(item =>
    item === source ||
    (isDot(item) !== isDot(source) && item.dataset.place.split(' ').some(place => places.includes(place)))
  );
  source.addEventListener('mouseenter', () => targets.forEach(item => item.classList.add('highlight')));
  source.addEventListener('mouseleave', () => targets.forEach(item => item.classList.remove('highlight')));
});
