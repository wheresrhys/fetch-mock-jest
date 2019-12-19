require('./jest-extensions');

const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('../fetch-mock-jest').sandbox();
Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch
});
module.exports = Object.assign(fetchMock, {
	Request: nodeFetch.Request,
	Response: nodeFetch.Response,
	Headers: nodeFetch.Headers,
});

const fetchMock = require('fetch-mock');
const jestify = fetchMockInstance => {

	// spy on the fetch handler so we can use all the
	// jest function assertions on it
	jest.spyOn(fetchMockInstance, 'fetchHandler')

	// make sure all the jest expectation helpers can find what they need on fetchMock.mock
	Object.assign(fetchMockInstance.mock, fetchMockInstance.fetchHandler.mock)

	// Return this monster!
	return fetchMockInstance
}

module.exports = jestify(fetchMock)
