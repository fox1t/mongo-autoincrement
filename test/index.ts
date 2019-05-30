import { test } from 'tap'
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

import autoIncrement from '../src'

test(`mongo-autoincrement`, async t => {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true })
  const db = client.db('test')

  t.teardown(async () => {
    client.close()
    await mongoServer.stop()
  })

  t.test('should return incremented number', async t2 => {
    t2.plan(2)
    const one = await autoIncrement(db, 'test', 'id')
    const two = await autoIncrement(db, 'test', 'id')
    t2.equal(one, 1)
    t2.equal(two, 2)
  })

  t.test('should return different numbers for different collections', async t2 => {
    t2.plan(2)
    const three = await autoIncrement(db, 'test', 'id')
    const one = await autoIncrement(db, 'test2', 'id')
    t2.equal(three, 3)
    t2.equal(one, 1)
  })

  t.test('should accept additional filter', async t2 => {
    t2.plan(1)
    const one = await autoIncrement(db, 'test2', 'id', { filter: { tenantId: '1' } })
    t2.equal(one, 1)
  })

  t.test('should use custom collectionName', async t2 => {
    t2.plan(1)
    const one = await autoIncrement(db, 'test', 'id', { collectionName: 'counters2' })
    t2.equal(one, 1)
  })

  t.test('should have different counters for different fields', async t2 => {
    t2.plan(2)
    const one = await autoIncrement(db, 'test3', 'id')
    const one1 = await autoIncrement(db, 'test3', 'id1')
    t2.equal(one, 1)
    t2.equal(one1, 1)
  })

  t.test('should custom step', async t2 => {
    t2.plan(1)
    const three = await autoIncrement(db, 'test4', 'id', { step: 3 })

    t2.equal(three, 3)
  })
  t.end()
})
