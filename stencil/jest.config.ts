const entriesFav = require('../assets/test/entriesFav.json');
const entriesSettings = require('../assets/test/entriesSettings.json');
const historySearchesPost = require('../assets/test/historySearchesPost.json');
const historySearchesSite = require('../assets/test/historySearchesSite.json');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.atob = jest.fn(() => {
  return '';
}) as jest.Mock;

global.fetchAjax = jest.fn(() => {
  return '';
}) as jest.Mock;

global.DOMParser = jest.fn(() => {
  return '';
}) as jest.Mock;

global.parser = jest.fn(() => {
  return '';
}) as jest.Mock;

global.parser.parseFromString = jest.fn(() => {
  return '';
}) as jest.Mock;

// @ts-ignore
window.streamline = {
  rest: null,
};

// @ts-ignore
window.streamlineData = {
  settings: JSON.stringify(entriesSettings),
  favourites: JSON.stringify(entriesFav),
  historySearchesPost: JSON.stringify(historySearchesPost),
  historySearchesSite: JSON.stringify(historySearchesSite),
  siteId: 1,
};
