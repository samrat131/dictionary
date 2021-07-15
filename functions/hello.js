const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri);

exports.handler = async function (event, context) {
  try {
    await client.connect();

    const database = client.db('nodejs_api_db');
    const posts = database.collection('Posts');

    const query = {};
    const post = await posts.findOne(query);
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(post)
    }

  } catch (error) {
    
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  } 
}