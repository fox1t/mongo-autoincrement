import { Db } from 'mongodb'

const defaultCollectionName = 'counters'
const defaultStep = 1

interface Options {
  collectionName?: string
  step?: number
  filter?: object
}

async function autoIncrement(
  db: Db,
  collection: string,
  field: string,
  { filter, collectionName = defaultCollectionName, step = defaultStep }: Options = {},
): Promise<number> {
  const result = await db.collection(collectionName).findOneAndUpdate(
    {
      collection,
      field,
      ...filter,
    },
    { $inc: { current: step } },
    { upsert: true, returnOriginal: false },
  )

  return result.value && result.value.current
}

export = autoIncrement
