require('./jest-extensions');

// const nodeFetch = jest.requireActual('node-fetch');
// const fetchMock = require('../fetch-mock-jest').sandbox();
// Object.assign(fetchMock.config, nodeFetch, {
//   fetch: nodeFetch
// });
// module.exports = Object.assign(fetchMock, {
// 	Request: nodeFetch.Request,
// 	Response: nodeFetch.Response,
// 	Headers: nodeFetch.Headers,
// });


const fetchMock = require('fetch-mock');
const jestify = fetchMockInstance => {

		const jestifiedInstance = new Proxy(fetchMockInstance, {
			get: (originalFetchMock, name) => {
				if (name === 'sandbox') {
					return new Proxy(originalFetchMock[name], {
						apply: (func, thisArg, args) => {
							const sandboxedFetchMock = func.apply(originalFetchMock, args);
							return jestify(sandboxedFetchMock);
						}
					});
				}
				return originalFetchMock[name];
			}
		});

	// spy on the fetch handler so we can use all the
	// jest function assertions on it
	jest.spyOn(jestifiedInstance, 'fetchHandler')

	// make sure all the jest expectation helpers can find what they need on fetchMock.mock
	Object.assign(jestifiedInstance.mock, jestifiedInstance.fetchHandler.mock)

	// make sure that the mock object that has properties updated
	// by the jest spy is the one that is exposed on fetch
	jestifiedInstance.fetchHandler.mock = jestifiedInstance.mock;

	// Return this monster!
	return jestifiedInstance
}

module.exports = jestify(fetchMock)

