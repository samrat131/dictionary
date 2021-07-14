const mongodb = require("mongodb")

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
}