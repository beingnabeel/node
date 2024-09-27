const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
// changing the threadpool size
// process.env.THREADPOOL_SIZE = 1;
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"), 0);

fs.readFile("test-file.txt", () => {
  console.log("I/o finished");
  console.log("--------------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"), 0);
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
