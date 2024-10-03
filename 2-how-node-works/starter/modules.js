// So arguments is an array in JavaScript, and this array contains all the values that were passed into a function. So when I log this arguments array to the console, if we actually see some values there, well, then it means that we're really in a function, okay? So let's run modules. And indeed, here we have the code in our
// console.log(arguments);
// And so let's remember the five arguments of the wrapper function. The first one is the export, so this one, which is currently empty because we're not exporting anything. The second one is the require function, so we can see that here, we have the require function indeed. Then the third one is called module, okay. And in module we have then module exports, which again we talked about in the last lecture. And what do we have here is not that important, again, I just wanted to show you that we're actually in a function right now, so that all this code that we have in this module is indeed wrapped into this wrapper function, okay? Then number three and number four are the filename and the directory name. And indeed, this is the name of the module that we're currently in, so modules.js. And then here we have the directory name. So I'm on my desktop, and then in this now Node works folder. So similar to this one here, but then this one has slash the module name, okay? So that proves us that, indeed, all the code inside a module is wrapped, and that we have access to all these variables, so these arguments, okay? So I just find this an interesting experiment that we can do. And we can actually do another cool thing. So to actually show you the wrapper function, we can require the module module, okay. So there's a module called module, which we actually never used but internally Node uses it. And in there we have the wrapper. And so that is actually this property is actually the wrapper function. So we can now take a look at that. And where is that, ah, yeah. So here, here it is actually. So this is the wrapper function.
// console.log(require("module").wrapper);
// the output of the above console.log is this.
// '(function (exports, require, module, __filename, __dirname) { ',
//   '\n});'

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(3, 4));

// another way of exporting modules
// exports
// const calc2 = require("./test-module-2");
// now this calc2 is our exports object which is having all the methods mention in that module.
// so the result we are getting from requiring this module is an object containing all the methods so we can immediately destructure that object and create variable names for properties in that object.
const { add, multiply, divide } = require("./test-module-2");
// so here the names should be exactly the same as the original object that we are requiring from.
// and we can only import the properties we want we dont need to import all of them

// console.log(calc2.multiply(2, 5));
console.log(multiply(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
// And so actually let's do that three time. And keeping in mind that we have caching in Node.js modules, what do you think will happen when we run this code? Okay, so let's run this and see what's gonna happen. Here we have the result, hello from the module, and then three times log this beautiful text. So we have this logging here three times, well, because we called the same function three times. But we have hello from the module only once, okay? And that is because of caching. So technically this module was only loaded once, and so the code inside of it was also executed once only. And so that's why this line of code here, this logging was only run once, okay? And so these other two loggings here, well, they came from cache, so they were stored somewhere in the Node's processes cache. And once we called the function here for the second time, it was simply retrieved from there, instead of loading the module again, okay? So I'm sure that makes a lot of sense to you. And so that was our lecture, actually. If you have any questions, you can of course, as always, post them to the Q&A and you will get help there. So that finishes this entire section. I know it was quite of a ride until we got to this point, so a lot of stuff to take in. And if you did correct everything 100%, don't worry all too much about it, because throughout the course, most of the stuff will become clear eventually, okay? So don't worry, just keep moving on in the course, and I'll see you in the next section.
