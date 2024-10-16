const fs = require("fs");
const express = require("express");
// importing our routehandler from tourController
// so currently we were in the routes folder so we go one level up ../
const tourController = require("./../controllers/tourController");
// const {getAllTours, getTour, updateTour, createTour, deleteTour} = require('./../controllers/tourController');

// Now, remember that when we export data from a file using the exports object. So just like we did here. When we then import everything into one object, then all of the data that was on exports is now gonna be on tourController. And so we will have tourController.getAllTours .createTours.getTour, and really, all of these, okay? So this object here will be the equivalent of the exports that we have here. Remember that? And so, it's really simple. All I have to do now is to create tourController., and that's it. Now I could have also used the structuring, which I also showed you before. So just to demonstrate, I could have used it like this, and then specified the exact same names that we have here. So getAllTours, and then createTour, and all of these, and then I could have used them directly here without having to write tourController, and dot. Okay, but I actually like it like this, and I see no problem of having it like this. So it makes it nicely visible that all of these functions here actually come from this tourController module.
// pasting all the route handler function here from the app.js
// const tours = JSON.parse(
//   // go out of this folder../
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// const getAllTours = (req, res) => {
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
// const getTour = (req, res) => {
//   console.log(req.params);

//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
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
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
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
// };
// const updateTour = (req, res) => {
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

// And so, next we need actually Express here, because we're using that variable, and so we need to import the Express module. So express, require express. Okay, it's kind of a convention to simply call this router, and not tourRouter. So router, and now we will export the router, and then import it into our main application, okay? So, remember how we do it when we only have one thing to export? Well, we use module.exports, and then put the router on there. Give it a save, and of course, we still get some errors, but that's because the tour router is not defined in our main application file. Okay, also what's not defined in this file is all of these functions here. Okay, so let's very quickly get them, and put them in the router file.
const router = express.Router();

// --------------------PARAM MIDDLEWARES----------------------------
// So param middleware is middleware that only runs for certain parameters, so basically, when we have a certain parameter in our URL.
// so basically the parameter for which this middleware is gonna run, and it's called id, and then of course our actual middleware function. And as usual, we have access to the request and to the response object, and then senses a middleware function also to the next function, right? Now in a param middleware function, we actually get access to a fourth argument and that one is the value of the parameter in question. So we usually call that one val, which stands for value.
// and this val here is what will actually gonna hald the id parameter
// router.param('id', tourController.checkID);
// so this middleware function is only defined in our tourroutes so it will not work for the id of the users route

// CREATE A CHECKBODY MIDDLEWARE
// CHECK IF THE BODY CONTAINS THE NAME AND THE PRICE.
// if not send back 400 status code( bad request ) from the client
// Add it to the post handler stack
// So its very easy. Lets say our function is called middleware and so what you have to do is to simply add that function here before the createTour handler that will ultimately create the tour. Okay? So this way when we have a post request for this route, it will then run this middleware first and only then the createTour.
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
// .post(tourController.checkBody, tourController.createTour);
// .post(tourController.createTour);
// (Man) So in this lecture, you're gonna learn how to chain multiple middleware functions for the same route. So up until this point, whenever we wanted to define a middleware, we only ever passed one middleware function. So for example here, for handling this post request, well we only passed in this middleware function which is our createTour handler. Okay? And so that's the only function that is gonna be called whenever we get a post request. Right? But lets now say that we want to actually run multiple middleware functions. Now you might ask "Why would we want to do that?". Well we might, for example, run a middleware before createTour here to actually check the data that is coming in the body. Right? So a bit similar to what we had before. So we did this check ID middleware before in order to check if the ID is actually valid and doing so outside of the actual route handlers so that they are only concerned with getting, updating, or deleting a tour.
// And so here, in this specific example with post, we might want to do the same thing. So as I said, we might want to check if request.buddy actually contains the data that we want for the tour. Okay? And so lets do that.
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// when we only have one thing to export we do module.exports
module.exports = router;
