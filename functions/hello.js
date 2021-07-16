const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority'
const client = new MongoClient(url)
var findResult = '';

// Database Name
const dbName = 'nodejs_api_db'

async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('posts')

  findResult = await collection.find({}).toArray()
  console.log('Found documents =>', findResult)

  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())

exports.handler = async function (event, context) {

  const post = [{
    title: "hello world",
    body: "this the content"
  }];

  return {
    statusCode: 200,
    body: JSON.stringify(findResult)
  }
}