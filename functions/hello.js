const { MongoClient } = require('mongodb')
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONNECTION_URL)

exports.handler = async function (event, context) {

  await client.connect()
  const db = client.db('nodejs_api_db')
  const collection = db.collection('posts')

  const insertResult = await collection.insertMany([
    {
      title: "hello this is test",
      body: "this is the body"
    },
    {
      title: "hello this is test2",
      body: "this is the body2"
    }
  ])

  const findResult = await collection.find({}).toArray()
  client.close()

  return {
    statusCode: 200,
    body: JSON.stringify(findResult)
  }
}