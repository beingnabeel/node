// It's kind of a convention to have all the Express configuration in app.js.
//           THE ORDER OF CODE REALLY MATTERS A LOT IN EXPRESS
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
// importing of routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// const port = 3000;
// ----------------------MIDDLEWARES-----------------
// USING 3RD PARTY MIDDLEWARE
//and now in here we call morgan. Okay and into this function, we can pass an argument which will kind of specify how we want the logging to look like. So, we can use some predefined strings for that and the one that I'm gonna use is called dev
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// So, calling this morgan function will return a function similar to this one here and so, that makes sense because while this is how a middleware function has to look like and so, let me actually prove that to you by looking at the source code for this package

// we can create our own middleware function. So, let's do that now. And so, of course, we still need to use app dot use. Okay, and so now, in here, all we have to do is to path in our function that we want to add to the middleware stack. So, remember from the last video that, of course, in each middleware function, we have access to the request and the response, okay? But also, we have the next function. And so, just like this, we edit as a third argument to this middleware function, okay? And like this, express then knows that we are actually defining a middleware here. Alright. Now, just like before, actually, we could have called this argument here something else, like X, or N, or, it doesn't really matter. What matters is that it's the third argument to this function. So express basically passes the next function as the third argument into this middleware function. And we can then call it whatever we want. But again, next is really the convention in express, and in order to avoid confusion, we always use this name, okay? And the same for request and response, as I mentioned before, we could call them something else. But the convention is to call them like this. Anyway, let's just log something to the console, here in this middleware function, just so that we have some code to actually run each time there is a new request. Let's say hello from the middleware. And add some emoji here, again, to make it pop a little bit. I really like that. And what happens here? Ah, right. So that is the code that we want to execute here. And now, just as we talked in the last video, we actually need to call the next function, okay? And if we didn't call next here, well, then the request/response cycle would really be stuck at this point. We wouldn't be able to move on, and we would never ever send back a response to the client. So I can't stress enough how important it is to never forget to use next in all of your middleware.
// Middleware to parse json
app.use(express.json());
// app.use(express.json()): This middleware is responsible for parsing the application/json request body and populating req.body with the parsed data.

// So app and assigned result of calling express. That's actually it. This here is a function which upon calling will add a bunch of methods to our app variable here. The first one that we're going to use is actually app.listen to basically start up a server. That is a bit similar to what we did before with the http package in the previous sections, right. So again, keep in mind that Express is 100% node js under the hood, and some of the things work in a very similar way here in Express. All right, again, it simply makes our lives a bit easier by taking some of the complexity away from us. Just like before, into app.listen, we paste in the port. Let's actually create a variable for that here before. Port and let's say 3000 for now. We're going to change that a bit later. We paste in the port and a callback function. Again, this is the callback function that will be called as soon as the server starts listening. Let's simply do a console.log here, app running on port. All right, so that is our server now actually already listening. Now what we need to do next is to define route. And once more, we actually already kind of defined routes before in the nodefarm project, remember that, but it works very differently with Express. Remember that routing means basically to determine how an application responds to a certain client request, so to a certain URL. And actually, it's not just a URL but also the http method which is used for that request. Remember that from the http lecture that we had before.
//  How do we do that? Well, it's very simple in Express. All we do is app, then the http method that we want to respond to, and let's start with the simplest one which is get, and then the URL. We're just specifying the kind of root URL here. Again, the route is basically the URL, which in this case, is just this root URL and also the http method, which is get in this case. Now, what do we actually want to happen when someone hits that URL with a get request? Well, whatever we want to do, we need to specify it in a callback function, which we specify as the second argument. We have a callback function just like this, and this callback function can accept a couple of arguments. The most basic one, and the ones that we usually always need are get request, entity response. In that regard, it is again very similar to what we did before in the nodefarm project. Back then, when we started our server, we also had access to the request and to response object. Now, they are a little bit different here in Express. They have a lot more data and methods on them, but the idea is exactly the same. So you see that Express apps and so also node apps for that matter, are all about requests and responses, simply because that is how the web actually works just as you learned in the previous sections. What do we want to do now?

// ------------SERVING STATIC FILES--------------------
//So, as I was saying, all we have to do is to use a simple built-in middleware that goes like this. Express dot static, because we wanna serve static files, so this is an obvious name for that. And so in here we pass the directory from which we want to serve static files. And in this case, I'm gonna use the public directory. So this folder here where we have these HTML files, okay? And actually let's use a template string here so that I can go ahead and use the dirname variable, then slash and public. Give it a save and go back to the browser. Then we will be able to open this overview.html. Now it's not going to work in this URL here. It actually has to be like this.
// Why don't we need the public folder here in the URL? Well, simply because when we open up a URL that it can't find in any of our routes, it will then look in that public folder that we defined. And it sets that folder to the root. Okay, so let's pretend that the root is now our public folder. So this here, and then the overview is in there. And so that's why we have done access to it. So in there we also have images, for example. Let's say we wanna open image and then this pin here. And we can do that. So image, pin png, and so here we go. Here is the image. Now what we can't do is this, because this is not a file. This looks like a regular route, and so Express actually tries to find a route handler for this one, which it can't because you didn't define anything.
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// now we will create another middleware and here we want to manipulate the request object.
// here we will add the current time to the request object
// here this toISOString will then convert it into nice readable string for us
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // calling the next middleware in the stack most important task.
});

// here these middlewares are applied globally
// ---------------------using 3rd party middleware ------------------------------
// So, as I mentioned, we're gonna use a middleware called Morgan which is a very popular logging middleware. So, a middleware that's gonna allow us to see request data right in the console. This morgan is a regular dependency.

// app.get('/', (req, res) => {
//   // Just some string again that we want to send back. We can also specify the status code and that's very easy. All we have to do is to before we actually send the string to the client, we just add status before that. The status method, and in here, we specify our code. And again, we're going to use 200 for okay.
//   //   res.status(200).send('Hello from the server side!');
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     app: 'Natours',
//   });
//   //   using .json here automaticall sets our content type to 'application/json
// });
// Now, going back here, let's add some more stuff because send simply sends this string here back to the client, but it's also very easy to send json to the client. Instead of using send, let's actually use json. The json method, and then in here, we can paste in an object.

// so whatever after app.___ we are writing is our http method
// This response that we're sending here, so this one here, is only sent when this get method is sent to our server on this URL.
// using the post method.
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// });

// ---------------------------------ROUTE HANDLERS----------------------

// -------------52. starting our api-------------------
// here the callback function is called as route handler
// here we should always specify the version so in future if we want to do some changes with the api we can change the version without breaking this.
// here tours is our resource and we want to send data about it to the client
// before we send the data we actually need to read it and we do it outside the route handler means before the method.
// we do that becoz the top level code is only executed once, which is right after the application startup.
// so only the callback function here will be running inside the event loop.
// __dirname is a variable where the current script is located
// json.parse will convert the json here to a javascript object or you can say array of js object.
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// Well, remember that we were gonna use the Jsend JSON formatting standard. Okay, and so in there, we specify a status, and so status, and that can either be success, fail, or error, okay. So success is obvious. It's when we have a 200 code or a 201 or really just any code that starts with 200. Then we have the fail, which is an error at the client, and then we also have error, when there was an error at the server. All right, but we are gonna use these a bit later. Anyway, we also have then the data property which is, as I mentioned, the so-called envelope for our data. So we specify the data property and that data will then in turn have an object which then contains the data, so the response step we actually wanna send.
// const getAllTours = (req, res) => {
//   // usually when we are sending multiple responses is to include a field called results with the number of results that we are sending.
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// --------------------------------RESPONDING TO URL PARAMSMETERS--------------------
// So req.params is where all the parameters of all these variables that we define here are stored.
// so req.params is very nice object which automatically assigns the value to our variable, so our parameter that we defined
// So if we didn't have the Y parameter, we would run into an error, because we are now not hitting this exact route, okay? So our route is now no longer exactly this, but it's only this. And so, there is an error, okay? Make sense? Now there is actually one thing that we can do, and that is optional parameters. So if you want to make this parameter optional, we just add a question mark to it, and now, it is optional, so we no longer have to specify it.
// app.get('/api/v1/tours/:id/:x/:y', (req, res) => {
// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
// find is just a regular js function, in which we will have access to current element in each iteration and we can then perform some operation and the find method will return us with the array having only the values that are true according to that operation
// const getTour = (req, res) => {
//   console.log(req.params);
//   // so the values that we are getting from req.params is string so we need to convert them into number.
//   const id = req.params.id * 1;
//   // const tour = tours.find((el) => el.id === req.params);
//   // here instead of req.params we will use the extracted id
//   //   // so here even when we are accessing the route with the id which is not present it is still giving me success so we need to change that. Well, as a very simplistic solution, what we can do is to check if the ID is larger than the length of the tours array, and if it is longer, well, then we can send back a 404 error saying that we could not find any tour for the given ID.
//   const tour = tours.find((el) => el.id === id);
//   // another solution is that we can try to find the tour with that id and if it is false or undefined then we can send this failed response
//   // if (id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//       // this here is es6 syntax which means tour: tour
//     },
//   });
// };
// const createTour = (req, res) => {
//   //   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   //   so here the new tour will be the body that we just sent plus the new id that we just created.
//   //   we can use Object.assign which basically allows us to create a new object by merging two existing objects together.
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   //   so for writing a file since we are in a callback we will use the asynchronous approach
//   //   here we also need to stringify the object and right now is just a plain js object.
//   // status code 200 stands for okay and 201 stands for created.
//   //   here we are using the jsend format where data is acting as the envelope.
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
//   //   we cannot send multiple responses.
//   //   res.send('Done');
// };

// handling patch request to update data ------------------------------------------------
// We have put and we have patch. And with put, we expect that our application receives the entire new updated object, and with patch, we only expect the properties that should actually be updated on the object, all right? So usually, I like to use patch, because I find it easier to simply update the properties that were updated. At least, when we start using MongoDB and Mongoose, it will be much easier to just do it like that, all right? And it's alsp easier for the user to simply send the data that is changing, instead of having to send the entire new object. So again, we are going to make our app work for patch and not for put. So we expect a patch request to come in on the URL
// when we update the data we send 200 status code.
// const updateTour = (req, res) => {
//   // here we are getting the id with req.params.id and at the same time converting it to a number * 1.
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// };

// // HANDLING DELETE REQUEST -----------------------------------------
// // when we have a delete request the response is basically 204, and that means no content, becoz we don't send any data back.
// const deleteTour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
// status code 500 means internal server error
// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined.',
//   });
// };

// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined.',
//   });
// };
// const createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined.',
//   });
// };
// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined.',
//   });
// };
// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined.',
//   });
// };
// 57------------------REFACTORNG OUR ROUTES-----------------------------
// here we are gonna re-organize our routes to make the code look little bit better.
// So right now, we have all these routes here. So the http method plus the url together with the route handler, which is this callback function. Right? And we have these routes and route handlers kind of all over the place. So we have this and then this and all after the other, but it's kind of difficult to see what route we actually have in our code. So all the routes should kind of be together, and then the handler functions also together. So separate from these routes here. Okay. So what I'm gonna do is to go ahead and basically export all of these handler functions into their own function. Okay?
// -----------------------------------------------ROUTES-----------
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// We can do even better. Because, let's say, that we want to, for example, change the version or the resource name. We would then have to change it in all of these five places, and that is not ideal. And so instead of having all of this, we can do something better. So let me actually start it from scratch,
// using router.---------------
// I will also want to have a file which contains the handlers only for the users and then also one file that will contain all the handlers for the tours, okay? And so that's actually what we're gonna do in the next lecture. But in order to be able to do that, we actually need to now create one separate router for each of our resources. So, let's go back to our routes here and so right now, we can say that all our routes, so these four routes here, we can say that they're all kind of on a same router, okay? And the router, is this app object. But if we want to separate these routes into different files, so again, one file for these two routes and one file for these two routes, then the best thing to do, is to create one router for each of the resources, okay? And so, this is how we're gonna do. It's actually not that complicated, but you will have to wrap your head around a couple of concepts, okay? So, let's start by saying, const tourRouter is equal to express.Router. Okay, so just like this, we create a new router and save it into this variable. Alright, and so now let's use that router for these two routes. So here we use it instead of app. Alright, so now we have two router and then route and then of course, the get and the post routes on that router.

// Now, how do we actually connect this new router with our application? Well, we'll use it as middleware, alright? And so that is because, this new modular tool router here, is actually a real middleware, alright? And so we can say, (keyboard typing), app.use, and then the route but let's keep that for later. So we can use, the tourRouter on our application and where do we want to use the tourRouter? Well, we want to use it on, /api/version one/tours, okay? So again, this tourRouter here, is a real middleware. And we want to use that middleware for this specific route. Okay, and so we use app.use and specify the middleware function, which is this router, then we specify the the route so the URL, for which, we actually want to use that middleware, okay? And so just like this, we created basically a sub application, okay? Now, there's just one thing that we really need to change here, which is these routes in here, okay? So let me change this here, and then explain why it has to be this way. So here, we only want the route, and in here, we only want the id, okay? Now, why is that? Well, it's because this tourRouter middleware, only runs on this route here anyway, okay? And so once we are in the router, then we already are at this route.
// so this tourRouter is a real middleware and we want to use it for this specific route /api/v1/tours

// const tourRouter = express.Router();
// const userRouter = express.Router();
// So, actually, when we create a router system like this, we actually say that we kind of create a small sub app for each of these resources, okay? So this is the route of or mini application, which is again, at /tours, Okay? And then the second route, is at /id, right? And that's because, before, it was at tours /id, so it was all of this. So like this, but now, this URL here is already in our kind of parent route up here, right? So let's say that we have an incoming request now for /api/version one /tours/version id.
// So the request goes into the middleware stack and when it hits this line of code here, it will match this URL here, right? So it will match this route and therefore or two router middleware function will run.

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter); //for this route we want to apply the tourRouter middleware
app.use('/api/v1/users', userRouter); // for this route we want to apply the userRouter middleware.
// so these two routes are also middleware that is why we can use app.use
// these above two lines are called as mounting new routers
// so mounting a new router on route basically
// so mounting the router should come after we have these routes or declared the variables
// so here we have imported the routers at the top and then mounted them here.

// ---------------------------------START THE SERVER ----------------------------

// app.listen(port, () => {
//   console.log(`App running at ${port}...`);
// });

module.exports = app;
