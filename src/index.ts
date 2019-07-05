import { Db, ClientSession } from 'mongodb'

const defaultCollectionName = 'counters'
const defaultStep = 1

interface Options {
  collectionName?: string
  step?: number
  filter?: object
  session?: ClientSession
}

async function autoIncrement(
  db: Db,
  collection: string,
  field: string,
  { filter, collectionName = defaultCollectionName, step = defaultStep, session }: Options = {},
): Promise<number> {
  const result = await db.collection(collectionName).findOneAndUpdate(
    {
      collection,
      field,
      ...filter,
    },
    { $inc: { current: step } },
    { upsert: true, returnOriginal: false, session },
  )

  return result.value && result.value.current
}

export = autoIncrement
