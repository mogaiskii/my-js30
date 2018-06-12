const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then( (blob) => blob.json() )
  .then( (data) => cities.push(...data) );

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const searchInput = document.getElementById('input');
  const searchOutput = document.getElementById('cities');

  searchInput.addEventListener('input', function() {
    displayMatches(this, searchOutput);
  });
}

function findMatches(wordToMatch, cities) {
  return cities.filter( (place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches(input, output) {
  const value = input.value;

  const matches = findMatches(value, cities).slice(0, 10);

  const html = matches.map( (place) => {
    const regexp = new RegExp(value, 'gi');
    const cityName = place.city.replace(
      regexp,
      `<span class="found">${value}</span>`
    );
    const stateName = place.state.replace(
      regexp,
      `<span class="found">${value}</span>`
    );
    const population = (place.population-0).toLocaleString('en');
    return `
    <li class="cities-search_item search-item">
      <span class="search-item_name">${cityName}, ${stateName}</span>
      <span class="search-item_population">
      ${population}
      </span>
    </li>
    `;
  } ).join('');
  output.innerHTML = html;
}
