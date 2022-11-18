// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

export const filterByGenreAndTitle = (movieList, genreId, string) =>
  movieList.filter((m) => m.genre_ids.includes(genreId) && m.title.toLowerCase().search(string) !== -1);

export const filterByName = (tvList, string) =>
  tvList.filter((t) => t.name.toLowerCase().search(string) !== -1);

export const filterByGenreAndName = (tvList, genreId, string) =>
  tvList.filter((m) => m.genre_ids.includes(genreId) && m.name.toLowerCase().search(string) !== -1);

export const sortByName = (itemList) => {
  const newList = itemList.slice().sort((a, b) => {
    if (a.title > b.title || a.name > b.name) return 1;
    else return -1;
  });
  return newList;
};

export const sortByTime = (itemList) => {
  const newList = itemList.slice().sort((a, b) => {
    if (a.release_date < b.release_date || a.first_air_date < b.first_air_date) return 1;
    else return -1;
  });
  return newList;
};