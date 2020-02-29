const fetchMock = require('fetch-mock');
const jestify = require('./jestify');

module.exports = jestify(fetchMock);
