// const fs = require("fs");
const Tour = require("./../models/tourModel");
// const tours = JSON.parse(
//   // go out of this folder../
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// So all these three functions have this very similar code where they check if the id is valid and if not, they send back this Invalid ID response. So we have all this code in the same place and as you already know, it is not a good practice to repeat code and so what we can do here is to use the concept of param middleware; and perform this check here in an outside middleware that it's gonna run before the request even hits these handler functions. So let's go ahead and copy or actually cut the code from here and create a new middleware function called checkID, and of course I also need to export that. So checkID and we have access, request, response, next, and again, keep in mind that it is a param middleware and so the fourth argument will be the value of the parameter. Okay, paste it here, and then don't forget to call next at the end of the middleware, all right? And what's also very important is that we have this return statement here, because if we didn't have this return here, well, then express would send this response back but it would still continue running the code in this function. And so after sending the response, it will then still hit this next function and it would move on to the next middleware and will then send another response to the client. But that is really not allowed, so remember that we actually run into this error before, where it told us that we were not allowed to send headers after the response had already been sent. And so that's the kind of error that we would run into if we didn't have this return statement, okay. So again, just make sure that after sending this response, the function will return so that it will finish and it will never call this next. So never forget that, but of course we're gonna do this multiple times throughout the rest of the course and so you will get used to this kind of pattern.
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);

//   // if (req.params.id * 1 > tours.length) {
//   //   return res.status(404).json({
//   //     status: "failed",
//   //     message: "Invalid ID",
//   //   });
//   // }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Missing name or price.",
//     });
//   }
//   // if everything is correct we move on to the next middleware
//   next();
// };
// So this middleware is now part of our pipeline as you can imagine it, now you might argue that we might simply create a simple function which could also check for the ID and I call that function inside of each of these tour function, and then call it inside each of these relevant tour controllers; but that would really go against the philosophy of express, where we should always work with the middleware stack, so with this pipeline as much as we can, okay, and so these functions here, they do not have to worry at all about validation. Each of these functions has only one purpose which is to do what they say, so this one just gets the tour, this one just creates a tour, this one just updates, and this one just deletes, it doesn't check, it doesn't have to worry about any of that. And if we would now add another controller here also depending on the id, well then that would automatically also check if the id is invalid without us having to do any additional steps.
// Now, the problem with this implementation, is that its actually way too simple. That's because, later on, we will have other query parameters. For example, sort, for sorting functionality, or page, for pagination. We need to make sure that we are not querying for these in our database. For example, if we added here, page, equal to two, then we would, of course, not get any result. Let me show that to you. And indeed we do not get any result, because there is no document in this collection where page is set to two. We only want to use this parameter here, or this field, page, to implement pagination and not to actually query in the database. So what we will have to do is, to basically exclude these special field names from our query string before we actually do the filtering.
exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  // when we need to query for all the documents we simply use find
  // filtering the data based on the query parameters passed in the url
  try {
    // for excluding the special field names from the query string
    // first make the shallow copy of the query string.
    // so here doing something like const queryOBj = req.query will basically make queryObj reference to the req.query so we need to make a hard copy and not a reference so for that we will destructure the object using spreap operator and make it as a new object.
    // BUILDING THE QUERY
    // 1A. filtering
    const queryOBJ = { ...req.query };
    // creating an array of excluded fields.
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryOBJ[el]);

    console.log(req.query, queryOBJ);

    //first way of writing a query
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: "easy",
    // });
    // here we will chain some mongoose method to build the query
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");
    // but here we are gonna use the req.query becoz the object here looks similar to the object of req.query
    // const tours = await Tour.find(req.query);

    // so the query for filter object will look something like this.
    // {difficulty: 'easy', duration: {$gte: 5}}
    // and we are getting this so we will add & in front of gte
    // {difficulty: 'easy', duration: {gte: 5}}
    // in the parameters we use bracket to specify the query
    // here we need to replace these gte, gt, lte, lt

    // ?duration[gte]=5;
    // 1B. ADVANCED FILTERING
    let queryStr = JSON.stringify(queryOBJ);
    // replace method has actually accepts a callback which is very powerful has as the first argument or the mathced string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    // so here instead of using req.query we will
    // use our filtered queryOBJ
    // const query = Tour.find(queryOBJ);
    let query = Tour.find(JSON.parse(queryStr));
    // 2. SORTING
    // if there is a sort property then we need to sort the result based on the value.
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy);
      // query = query.sort(req.query.sort);
      query = query.sort(sortBy);
    } else {
      // if the sorting value is not provided.
      query = query.sort("-createdAt");
    }
    // if there is a positive value then it will sort them in the ascending order but if there is a - then will do the opposite and sort them in the descending order.
    // we can sort based on multiple paramethers by separating them with commas
    // ex ?sort=price,ratingsAverage
    // we need to replace the comma from here.
    // 3. FIELD LIMITTING
    // The process of selecting certain field names is called as projecting
    // the - here is for excluding
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
      // we will have everything except the v field here.
    }
    // for implementing pagination we will use the page and the limit fields
    // PAGINATION
    // page 2&limit=10, 1-10, page1, 11-20 page 2, 21-30 page 3.
    // we should have default value because the even if the user have not specified a page value or any limit we still want the pagination
    // multiplying by one makes a string to a number
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // EXECUTING THE QUERY
    // const tours = await Tour.find(queryOBJ);
    const tours = await query;
    res.status(200).json({
      status: "success",
      // requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  // the above one is the shorthand property for the
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // // if (!tour) {
  // //   return res.status(404).json({
  // //     status: 'failed',
  // //     message: 'Invalid ID',
  // //   });
  // // }
  // // this check will now be coming from the middleware
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour,
  //     // this here is es6 syntax which means tour: tour
  //   },
  // });
  // ----------------implementation---------
  try {
    const tour = await Tour.findById(req.params.id);
    // this above line is the shorhand for doing this
    // Tour.findOne({_id: req.params.id})
    // this findOne method only return one document.
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
};
exports.createTour = async (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
  // -----------------------IMPLEMENTING OUR LOGIC---------------------------
  // previously we have seen we do it like this
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      // message: "Invalid data sent",
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }
  try {
    // at the begining of this try block we need to query for the document which needed to be updated and then we can update it.
    // here in the third argument we can also pass in some options
    // here we are doing the patch request in the put request the original opject is completely replaced by body that was sent in
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        // here now we need to send the data to the client
        // it means tour: tour
        // tour: "<Updated tour here...>",
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// in a restful API it's a common practice to not send any data to the client whenever there is delete operation
exports.deleteTour = async (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
