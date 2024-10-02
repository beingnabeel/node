const fs = require("fs");
const server = require("http").createServer();
// here we are requiring the http object and at the sametime calling createServer() method on that object and storing it in server so we can use it

//All right. Now lets say that for some reason in our application, we need to read a large text file from the file system, and then send it to the client. So how would we do that?

// listening to the request event and then specify our callback
server.on("request", (req, res) => {
  //So, the first solution that we're going to use is the easiest and most straight-forward one. Which is to simply read the file into a variable, and then once that's done, send it to the client in the way that we already know how to do it.
  //   solution 1
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data); // here we are sending the data to the client
  //   });
  //   but the problem is that with this solution, node will actually have to load the entire file into memory, because only after that's ready, it can then send that data. Now this is a problem when the file is big, and also when there are a ton of requests hitting your server. Because the node process will very quickly run out of resources and your app will quit working, everything will crash, and your users will not be happy believe me. So this solution here does work when we're just creating something small locally for just ourselves, for example. But in a production-ready application, you cannot use a piece of code like this. Okay? So lets move on to our second solution. And in that solution, we will actually use streams. Okay, so lets comment out this part, and move on to solution number two.
  //   solution 2 : streams
  //   And the idea here is that we actually don't really need to read this data from the file into a variable, right? We don't need this variable. So instead of reading the data into a variable, and having to store that variable into memory, we will just create a readable stream. Then as we receive each chunk of data, we send it to the client as a response which is a writable stream remember.
  //   lecture, that each time there is a new piece of data that we can consume, a readable stream emits the data event. Okay, and so we can listen to that, just like we learned in the events lecture. So readable.on, data, and then our callback function. And in our callback function, we have access to that piece of data, so to that chunk. Let me call it chunk here in our callback function and so now we can handle this piece of data. And what we're going to do with this piece of data, with this chunk, is to actually write it to a writable stream, which is the response. So, res.write, this chunk. Okay?
  //   we are gonna write this chunk on to a writable stream which is response here.
  //   const readable = fs.createReadStream("./testttt-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   //   So again remember that this response is a writable stream. So just as I mentioned in the previous video, right? And so we can now use the write method to send every single piece of data into that stream. Okay, and with this effectively we're streaming the content from the file right to the client. Okay, you understand the difference? So before, we write everything at once into a variable, and once that was ready, we then sent that entire piece of data back to the client. But in this situation, with the stream, it is different. We're effectively streaming the file, so we read one piece of the file, and as soon as that's available, we send it right to the client, using the write method of the respond stream. Then when the next piece is available then that piece will be sent, and all the way until the entire file is read and streamed to the client. Okay, so now just to finish, we also have to handle the event when all the data is read.
  //   readable.on("end", () => {
  //     res.end();
  //     // So on that case, the end event will be emitted, and so as soon as that happens what we're going to do is to do res.end, okay? And we used this one before, so calling end on the response, we did that before, right? And now, it makes actually more sense, because again, the response is also a stream, and the end method signals that no more data will be written to this writable stream, okay?
  //     // Now in this case, we're not passing anything into this end method, because we already sent all the data using res.write, chunk by chunk, and so when the readable stream is finished reading its file, well all we have to do is to then signal that we're ready using res.end like this, okay?
  //   });
  //   but there still is a problem with this approach that I just showed you. And the problem is that our readable stream, so the one that we're using to read the file from the disk, is much much faster than actually sending the result with the response writable stream over the network. And this will overwhelm the response stream, which cannot handle all this incoming data so fast. And this problem is called backpressure. And it's a real problem that can happen in real situations. So in this case, backpressure happens when the response cannot send the data nearly as fast as it is receiving it from the file, does that make sense? So we have to fix that solution,

  //   to our code, because I want to show you now, that there is another event that we can listen to on a readable stream, which is the error event. So readable.on('error') and in this callback function we have access to the error object.
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found !");
  //   });
  //   SOLUTION 3: FINAL ONE
  //   So the secret here is to actually use that pipe operator that I mentioned in the last video, okay? So the pipe operator is available on all readable streams, and it allows us to pipe the output of a readable stream right into the input of a writable stream, okay? And that will then fix the problem of backpressure because it will automatically handle the speed basically of the data coming in, and the speed of the data going out. Okay, so lets actually get our readable stream here.
  //   BACKPRESSURE IS BASICALLY A PROBLEM OF SPEED OF DATA COMING IN AND SPEED OF DATA GOING OUT.
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
  //   readablesource.pipe(writableDestination);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening on port 8000");
});
