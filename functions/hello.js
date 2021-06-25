exports.handler = async event => {
  const subject = event.queryStringParameters.name || 'World'
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