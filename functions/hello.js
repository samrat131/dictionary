const { MongoClient } = require('mongodb')
require('dotenv').config();

const url = 'mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority'

const client = new MongoClient(url)

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
    body: process.env.TEST
  }
}