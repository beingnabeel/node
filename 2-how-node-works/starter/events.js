const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
// So we want to emit an event called newSale, okay? And using the example of clicking on a button that I used before, this emitting here is as if we were clicking on the button, and so now we have to set up these listeners, okay? And let me actually do that before here, and so again we use our myEmitter object. Enter that we use the on method, okay? So on newSale and then the callback function , which is gonna get executed as soon as the event is emitted. So as usually, let's simply to the console. "There was a new sale!" Okay, and let's add another one. So remember that I said earlier that one of the nice things about these event emitters is that we can actually set up multiple listeners for the same event.
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
// and all these .on are the listeners which are waiting for some event to happen so they can listen and does the task according to the callbacks associated with them.

myEmitter.emit("newSale", 9);
// here these are the emmitters which are emmiting the event which can be observed by the listeners
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
