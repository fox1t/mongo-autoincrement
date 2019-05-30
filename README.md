# mongo-autoincrement ![mongo-autoincrement](https://user-images.githubusercontent.com/6388707/58651754-604fc000-8312-11e9-94c9-f3aa122802a4.png)


[![built with typescript-lib-starter](https://img.shields.io/badge/built%20with-typescript--lib--starter%20-blue.svg)](https://github.com/fox1t/typescript-lib-starter)
[![styled with prettier](https://img.shields.io/badge/styled%20with-Prettier-blue.svg)](https://github.com/prettier/prettier)
[![styled with prettier](https://img.shields.io/badge/linted%20by-TSLint-brightgreen.svg)](https://palantir.github.io/tslint/)
[![styled with prettier](https://img.shields.io/badge/tested%20with-node--tap-green.svg)](https://github.com/tapjs/node-tap)


This package brings auto increment functionality to MongoDb. It uses a collection (by default called `counters`) to store the current the sequential number. Every collection, field or even custom filter can be managed separately.


## Install
`$ npm install mongo-autoincrement`

## Usage

The module exports just one function:
 ```typescript
 autoIncrement(db: Db, collection: string, field: string, options?)
 ```

 You can call it like this:

```typescript
const { MongoClient } = require('mongodb')
const autoIncrement = require('mongo-autoincrement') // or import autoIncrement from 'mongo-autoincrement'

;(async () => {
  // connect to mongodb server
  const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true })

  // get mongo database instance
  const db = client.db('test')
  const one = await autoIncrement(db, 'test', 'id')
})()
```

## Using more than one field for a counter
For example

```typescript
await autoIncrement(db, 'test', 'id', { filter: { tenantId: '1' } })
```
will add this counter:
```typescript
{
  collection: 'test',
  field: 'id',
  tenantId: '1',
  current: 1 // this is the special autoincrement prop
}
```
## Options

For more specific query and configuration you can pass custom options.

```typescript
interface Options {
  filter?: object
  collectionName?: string
  step?: number
}
```

* filter: use this option if additional filters are needed.
* collectionName: sets autoIncrement collection name. Defaults to 'counters';
* step: lets you control the increse step. Defaults to 1;

## License

MIT
