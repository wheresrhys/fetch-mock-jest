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

`expect(fetchMock)` can be inspected using all the built in jest function inspection assertions

In addition, the following work:
`expect(fetchMock).toHaveLastFetched(url, options)`
`expect(fetchMock).toHaveNthFetched(n, url, options)`
`expect(fetchMock).toHaveFetchedTimes(times, url, options)`
`expect(fetchMock).toBeDone(matcher)`
, proxying through to the similar fetchMock methods.
