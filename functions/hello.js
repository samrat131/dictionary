const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority'
const client = new MongoClient(url)

exports.handler = async function (event, context) {

  await client.connect()
  const db = client.db('nodejs_api_db')
  const collection = db.collection('posts')
  const findResult = await collection.find({}).toArray()
  client.close()

  // const post = [{
  //   title: "hello world",
  //   body: "this the content"
  // }];

  return {
    statusCode: 200,
    body: JSON.stringify(findResult)
  }
}