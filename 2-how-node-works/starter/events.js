const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});
myEmitter.on("newSale", () => {
  console.log("Costumer name: jonas");
});
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});
myEmitter.emit("newSale", 9);
// passing in extra arguments in the emitter so that the listeners can use that argument.
// working on http part-------------------------------
const server = http.createServer();
// .on anyhwere means the code is listening for the events to happen
server.on("request", (req, res) => {
  console.log("Request received");
  //   res.end("Request is being received");
});

server.on("request", (req, res) => {
  console.log("request has been received");
  res.end("another request has been received");
});
// this event is fired when the server closes down
server.on("close", () => {
  console.log("server is closing down");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening on port 8000");
});

// // closing the server
// setTimeout(() => {
//   server.close(() => {
//     console.log("server is closed now");
//   });
// }, 2000);
