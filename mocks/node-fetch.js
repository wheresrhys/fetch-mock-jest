const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('../fetch-mock-jest').sandbox();
Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch
});
module.exports = fetchMock;
