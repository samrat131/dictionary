const { MongoClient } = require('mongodb')
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONNECTION_URL)

exports.handler = async function (event, context) {

  await client.connect()
  const db = client.db('dictionary')
  const collection = db.collection('words')

  const insertResult = await collection.insertMany([
    {
      english: "Incarcerate",
      bangla: "কারারুদ্ধ করা"
    },
    {
      english: "Upbringing",
      bangla: "lalon palon kora"
    }
  ])

  const findResult = await collection.find({}).toArray()
  client.close()

  return {
    statusCode: 200,
    body: JSON.stringify(findResult)
  }
}