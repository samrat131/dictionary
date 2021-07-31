const { MongoClient } = require('mongodb')
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONNECTION_URL)

exports.handler = async function (event, context) {

  const mode = event.queryStringParameters.mode;
  const eng = event.queryStringParameters.eng || null;
  const ban = event.queryStringParameters.ban || null;
  const code = event.queryStringParameters.code || null;

  await client.connect()
  const db = client.db('dictionary')
  const collection = db.collection('words')

  if (mode == 'write') {
    if (code == process.env.SECRET_CODE) {
      await collection.insertOne( { english: eng, bangla: ban } )
      client.close()
      return {
        statusCode: 201,
        body: 'Created'
      }
    } else {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      }
    }
  }

  if (mode == 'update') {
    const filter = { _id: '6105675b25eb99532064f9c1' };
    const updateDocument = {
      $set: {
          english: 'test22',
          bangla: 'test22'
      }
    };
    
    const result = await collection.updateOne(filter, updateDocument, {});
    client.close()

    return {
      statusCode: 200,
      body: 'Updated'
    }
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