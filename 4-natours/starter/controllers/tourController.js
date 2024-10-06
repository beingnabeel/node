const fs = require('fs');

const tours = JSON.parse(
  // go out of this folder../
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// So all these three functions have this very similar code where they check if the id is valid and if not, they send back this Invalid ID response. So we have all this code in the same place and as you already know, it is not a good practice to repeat code and so what we can do here is to use the concept of param middleware; and perform this check here in an outside middleware that it's gonna run before the request even hits these handler functions. So let's go ahead and copy or actually cut the code from here and create a new middleware function called checkID, and of course I also need to export that. So checkID and we have access, request, response, next, and again, keep in mind that it is a param middleware and so the fourth argument will be the value of the parameter. Okay, paste it here, and then don't forget to call next at the end of the middleware, all right? And what's also very important is that we have this return statement here, because if we didn't have this return here, well, then express would send this response back but it would still continue running the code in this function. And so after sending the response, it will then still hit this next function and it would move on to the next middleware and will then send another response to the client. But that is really not allowed, so remember that we actually run into this error before, where it told us that we were not allowed to send headers after the response had already been sent. And so that's the kind of error that we would run into if we didn't have this return statement, okay. So again, just make sure that after sending this response, the function will return so that it will finish and it will never call this next. So never forget that, but of course we're gonna do this multiple times throughout the rest of the course and so you will get used to this kind of pattern.
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price.',
    });
  }
  // if everything is correct we move on to the next middleware
  next();
};
// So this middleware is now part of our pipeline as you can imagine it, now you might argue that we might simply create a simple function which could also check for the ID and I call that function inside of each of these tour function, and then call it inside each of these relevant tour controllers; but that would really go against the philosophy of express, where we should always work with the middleware stack, so with this pipeline as much as we can, okay, and so these functions here, they do not have to worry at all about validation. Each of these functions has only one purpose which is to do what they say, so this one just gets the tour, this one just creates a tour, this one just updates, and this one just deletes, it doesn't check, it doesn't have to worry about any of that. And if we would now add another controller here also depending on the id, well then that would automatically also check if the id is invalid without us having to do any additional steps.
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }
  // this check will now be coming from the middleware
  res.status(200).json({
    status: 'success',
    data: {
      tour,
      // this here is es6 syntax which means tour: tour
    },
  });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
