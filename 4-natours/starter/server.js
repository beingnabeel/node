const app = require('./app');
// we have created this file to keep everything releated to server in this file and it's convention in node.js
// And later on we will actually have other stuff in this file that is not related to express, but still related to our application. So stuff like database configurations, or some error handling stuff, or environment variables, all of that stuff will live in this server.js, which is kind of our entry point, okay?
const port = 3000;
app.listen(port, () => {
  console.log(`App running at ${port}...`);
});
