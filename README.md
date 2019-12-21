# fetch-mock-jest

Wrapper around fetch-mock to make working with jest a jolly old joy.

Untested, but the API is essentially gonna be:

# Installation

## global fetch

`const fetchMock = require('fetch-mock-jest')`

## node-fetch

```
jest.mock('node-fetch', () => require('fetch-mock-jest'))
const fetchMock = require('node-fetch')
```

# API

`expect(fetchMock)` can be inspected using all the built in jest function inspection assertions. `fetch.mockClear()` and `fetch.mockReset()` shodul aslo work (however all other jest mock setup methods are disabled as fetch-mock's own methdos should always be used)

In addition, the following work:
`expect(fetchMock).toHaveLastFetched(url, options)`
`expect(fetchMock).toHaveNthFetched(n, url, options)`
`expect(fetchMock).toHaveFetchedTimes(times, url, options)`
`expect(fetchMock).toBeDone(matcher)`
, proxying through to the similar fetchMock methods.
