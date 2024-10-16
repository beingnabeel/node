const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
// changing the threadpool size
// process.env.THREADPOOL_SIZE = 1;
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/o finished");
  console.log("--------------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"), 0);
  // Now nextTick is actually really a misleading name, because a tick is actually an entire loop, but nextTick actually happens before the next loop phase, and not the entire tick, so that's what I was saying before. Then on the other side, setImmediate would make you think that it's callback would be executed immediately, but it actually doesn't, right, so setImmediate actually gets executed once per tick, while nextTick gets executed immediately.
  process.nextTick(() => console.log("Process.nexttick"));
  crypto.pbkdf2("password", "salt", 1000000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 1000000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2Sync("password", "salt", 1000000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2("password", "salt", 1000000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});
console.log("hello from the top level code");
