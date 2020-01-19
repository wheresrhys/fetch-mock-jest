const fetchMock = require('fetch-mock/cjs/client.js');
const jestify = require('./jestify')

module.exports = jestify(fetchMock);
