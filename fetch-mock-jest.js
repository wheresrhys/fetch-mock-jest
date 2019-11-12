require('./jest-extensions');
const fetchMock = require('fetch-mock');
const jestify = fetchMockInstance => {

	// wrap in a proxy so that we can force .sandbox() to always return
	// a jestified instance too
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

	// as we already use 'mock' in the fetch-mock api, we can't just pass
	// fetchMock in to expect, as jest will look for its standard 'mock'
	// property, try to use fetchMock's function and throw an error.
	// Instead we assign the mock to a property that is
	// clearly intended for jest's use, and users can then use:
	// expect(fetch.jest).not.toHavebeenCalled()
	jestifiedInstance.jest = jestifiedInstance.fetchHandler;

	// but given that the built in assertions expect to use fetchMock.jest
	// we aim for consistency, right, so this means any custom assertions
	// we build must also start off from fetchMock.jest
	// so how do we provide those assertions with access to the underlying
	// fetchMock instance? By assigning the instance as a property of the jest
	// mock. Talk about inception!
	jestifiedInstance.jest.fetchMock = jestifiedInstance

	// Return this monster!
	return jestifiedInstance
}

module.exports = jestify(fetchMock)
