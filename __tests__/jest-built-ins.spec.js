jest.mock('node-fetch', () => require('../fetch-mock-jest').sandbox())
const fetch = require('node-fetch');
describe('jest built-ins', () => {
	beforeAll(() => {
		fetch.mock('*', 200)
		fetch('http://example.com', {
			headers: {
				test: 'header'
			}
		})
	})

	afterAll(() => fetch.reset())

	it('exposes `calls` property', () => {

	})
// mockFn.mock.calls
// mockFn.mock.results
// mockFn.mock.instances
// mockFn.mockClear()
// mockFn.mockReset()
// mockFn.mockRestore()
// .toHaveBeenCalled()
// .toHaveBeenCalledTimes(number)
// .toHaveBeenCalledWith(arg1, arg2, ...)
// .toHaveBeenLastCalledWith(arg1, arg2, ...)
// .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
// .toHaveReturned()
// .toHaveReturnedTimes(number)
// .toHaveReturnedWith(value)
// .toHaveLastReturnedWith(value)
// .toHaveNthReturnedWith(nthCall, value)

// ... plus should extend jest with some additional fetchy things:

// .toHave[Last|Nth]FetchedUrl[Times]()
// .toHave[Last|Nth]FetchedWithOptions[Times]()
// .toHave[Last|Nth]FetchedWithOptionsMatching[Times]()
// .toHave[Last|Nth]FetchedWithRequest[Times]()
// .toBeDone(forMatcher)
})



