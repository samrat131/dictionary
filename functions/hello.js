const mongoose = require('mongoose');

exports.handler = async event => {
  
  const subject = event.queryStringParameters.name || 'World'

  mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, () => {
    console.log('db connected');
  });

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