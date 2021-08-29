const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONNECTION_URL)

exports.handler = async function (event, context) {

  const id = event.queryStringParameters.id || null;
  const eng = event.queryStringParameters.eng || null;
  const ban = event.queryStringParameters.ban || null;
  const code = event.queryStringParameters.code || null;
  const mode = event.queryStringParameters.mode || 'read';
  const memorized = event.queryStringParameters.mode || null;

  await client.connect()
  const db = client.db('dictionary')
  const collection = db.collection('words')

  if (mode == 'write') {

    if (code != process.env.SECRET_CODE) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      }
    }

    await collection.insertOne( { english: eng, bangla: ban } )
    client.close()

    return {
      statusCode: 201,
      body: 'Created'
    }
  }

  if (mode == 'update') {

    if (code != process.env.SECRET_CODE) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      }
    }

    if (id == null) {
      return {
        statusCode: 400,
        body: 'Error, invalid ID'
      }
    }

    const objId = new ObjectId(id)
    const filter = { _id: objId };

    let updateDoc = {}
    if (memorized) {
      updateDoc = {
        $set: {
          memorized: true,
        },
      }
    } else {
      updateDoc = {
        $set: {
          english: eng,
          bangla: ban,
        },
      }
    }

    const result = await collection.updateOne(filter, updateDoc)
    client.close()

    if (result.modifiedCount) {
      return {
        statusCode: 200,
        body: 'Updated'
      }
    }

    return {
      statusCode: 200,
      body: 'Not Updated'
    }
  }

  if (mode == 'delete') {

    if (code != process.env.SECRET_CODE) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      }
    }

    if (id == null) {
      return {
        statusCode: 400,
        body: 'Error, invalid ID'
      }
    }

    const objId = new ObjectId(id)
    const filter = { _id: objId };
    const result = await collection.deleteOne(filter)
    client.close()
    
    if (result.deletedCount === 1) {
      return {
        statusCode: 200,
        body: 'Deleted'
      }  
    }

    return {
      statusCode: 200,
      body: 'Not Deleted'
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