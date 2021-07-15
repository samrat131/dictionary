/* const mongodb = require("mongodb")

exports.handler = async function (event, context) {
  const client = await mongodb.connect('mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority', { useUnifiedTopology: true })
  const db = client.db()

  try {
    const posts = await db.collection("posts").find({}).toArray()
    client.close()
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: "Please try again later."
    }
  }
} */

const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority";

const client = new MongoClient(uri);

exports.handler = async function (event, context) {
  try {
    await client.connect();

    const database = client.db('nodejs_api_db');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'hello' };
    const movie = await movies.findOne(query);

    return {
      statusCode: 200,
      body: JSON.stringify(movie)
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}