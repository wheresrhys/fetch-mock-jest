# fetch-mock-jest

Wrapper around [fetch-mock](http://www.wheresrhys.co.uk/fetch-mock) - a comprehensive, isomorphic mock for the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - which provides an interface that is more idiomatic when working in [jest](https://jestjs.io)

# Installation

`npm install -D fetch-mock-jest`

## global fetch

`const fetchMock = require('fetch-mock-jest')`

## node-fetch

```
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')
```

# API

All the built in jest function inspection assertions can be used, e.g. `expect(fetchMock).toHaveBeenCalledWith('http://example.com')`.

`fetch.mockClear()` can be used to reset the call history

`fetch.mockReset()` can be used to remove all configured mocks

All other jest methods for configuring mock functions are disabled as fetch-mock's own methods should always be used

`fetchMock.mock.calls` and `fetchMock.mock.results` are also exposed, giving access to manually inspect the calls.

The following custom jest expectation methods, proxying through to `fetch-mock`'s inspection methods are also available. They can all be prefixed with the `.not` helper for negative assertions.

- `expect(fetchMock).toHaveFetched(filter, options)`
- `expect(fetchMock).toHaveLastFetched(filter, options)`
- `expect(fetchMock).toHaveNthFetched(n, filter, options)`
- `expect(fetchMock).toHaveFetchedTimes(n, filter, options)`
- `expect(fetchMock).toBeDone(filter)`

`filter` and `options` are the same as those used by [`fetch-mock`'s inspection methods](http://www.wheresrhys.co.uk/fetch-mock/#api-inspectionfundamentals)

### TODO

These would also be useful jest extensions:

- `toHaveFetched`
- `toHaveRespondedWith(object | status | string )` (using fetch-mock internals to convert to a response config, then use jest objectMatching)
