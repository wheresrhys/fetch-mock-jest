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
	//
	// expect(fetch.jest).not.toHavebeenCalled()
	//
	jestifiedInstance.jest = jestifiedInstance.fetchHandler;
	return jestifiedInstance
}

module.exports = jestify(fetchMock)
