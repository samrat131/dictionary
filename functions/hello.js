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

// const mongoose = require('mongoose');

exports.handler = async event => {
  
  const subject = event.queryStringParameters.name || 'World'

  // mongoose.connect('mongodb+srv://sam123:sam123@cluster0.6io27.mongodb.net/nodejs_api_db?retryWrites=true&w=majority', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true
  // }, () => {
  //   console.log('db connected');
  // });
  
  // mongoose.connection.close();
  // mongoose.disconnect();
  console.log('hello test');

  return {
    statusCode: 200,
    body: JSON.stringify(
      [{
        id: 1,
        title: "hello",
        content: "lorem ipsum dolor sit amet"
      },
      {
        id: 2,
        title: "hello 2",
        content: "lorem ipsum dolor sit amet 2"
      },
      {
        id: 3,
        title: "hello 3",
        content: "lorem ipsum dolor sit amet 3"
      }]
    ),
  }
}