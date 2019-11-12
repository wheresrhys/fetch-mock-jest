# fetch-mock-jest

Wrapper around fetch-mock to make working with jest a jolly old joy.

Untested, but the API is essentially gonna be:

# Installation

## global fetch

const fetchMock = require('fetch-mock-jest')

## node-fetch

const fetchMock = require('node-fetch')

### jest.config

```js
module.exports = {
    moduleNameMapper: {
        'node-fetch': 'fetch-mock-jest/mocks/node-fetch.js'
    },
};
```

# API

`expect(fetchMock.jest)` can be inspected using all the built in jest function inspection assertions

In addition, the following work:
`expect(fetchMock.jest).toHaveLastFetched(url, options)`
`expect(fetchMock.jest).toHaveNthFetched(n, url, options)`
`expect(fetchMock.jest).toHaveFetchedTimes(times, url, options)`
`expect(fetchMock.jest).toBeDone(matcher)`
, proxying through to the similar fetchMock methods.
