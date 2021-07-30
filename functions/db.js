const { MongoClient } = require('mongodb')
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONNECTION_URL)

exports.handler = async function (event, context) {

  const mode = event.queryStringParameters.mode;
  const eng = event.queryStringParameters.eng || null;
  const ban = event.queryStringParameters.ban || null;

  await client.connect()
  const db = client.db('dictionary')
  const collection = db.collection('words')

  if (mode == 'write') {
    await collection.insertOne( { english: eng, bangla: ban } )  
  }

  let findResult
  if (mode == 'read') {
    findResult = await collection.find({}).toArray()
  }

  client.close()

  return {
    statusCode: 200,
    body: JSON.stringify(findResult)
  }
}