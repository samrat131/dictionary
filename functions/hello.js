exports.handler = async function (event, context) {

  const post = [{
    title: "hello world",
    body: "this the content"
  }];

  return {
    statusCode: 200,
    body: JSON.stringify(post)
  }
}