const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
// Replacing the password placeholder with the actual password.
const DB = process.env.MONGO_URi.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);
// in the connect method of of mongoose we need to pass the connection string AND as a second parameter we can pass in an option to deal with the depracation warnings.
// jjjjjjjjj
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this line
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

//-------------------------------------------------models------------------------
// models is like blueprint that we use to create documents.
// so we create model using mongoose schema
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "A tour must have a name"],
//     unique: true,
//   },
//   rating: {
//     type: Number,
//     default: 4.5,
//   },
//   price: {
//     type: Number,
//     required: [true, "A tour must have a price"],
//   },
// });
// const Tour = mongoose.model("Tour", tourSchema);
// creating the model from this schema
// const testTour = new Tour({
//   name: "The Forest Hiker",
//   rating: 4.7,
//   price: 497,
// });

// this part was for the testing purposes.

// const testTour = new Tour({
//   name: "The Park Camper",
//   price: 400,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR 🎇🎇: ", err);
//   });
// this will save it to the tour collection in the database

// we have created this file to keep everything releated to server in this file and it's convention in node.js
// And later on we will actually have other stuff in this file that is not related to express, but still related to our application. So stuff like database configurations, or some error handling stuff, or environment variables, all of that stuff will live in this server.js, which is kind of our entry point, okay?
// ------------------------------ENVIRONMENT VARIABLES-------------------------
// So remember that everything that is not related to Express we're gonna do it outside of the app.JS file. So we only use this one here to configuring our application. So we only use this one in order to configure everything that has to do with the Express application. But the environment variables are really outside the scope of Express. So let's quickly do a console.log here of app.get and then end.
console.log(app.get("env"));
// Now this env variable here is actually set by Express, but node JS itself actually also sets a lot of environment variables. And so let's actually take a look at those as well. So these ones are located at process .env. Give it a save and so here we have a bunch of different variables okay and I will not go through all of them but let's just see they really are a bunch of them, and node uses most of them internally. For example a task to current working directory here in this environment variable and really a bunch of other stuff as you can see. For example my home folder or my login name you see the script that we use to start this process so really a bunch of stuff that for some reason node JS internally needs. Now these variables, they come from the process core module and we're set at the moment that the process started. And as you see, we didn't have to require the process module right. It is simply available everywhere automatically. Now in Express, many packages depend on a special variable called node N. So it's a variable that's kind of a convention which should define whether we're in development or in production mode okay. However Express does not really define this variable, and so we have to do that manually. And there are multiple ways in which we can do it, but let's start with the easiest one which is to use the terminal. So I'm gonna finish this process here, clear it, and so when we last started this process we did it using npm start. And npm start in turn stands for where is it? So it stands for nodemon server. And so let's copy this actually here.
// So we use nodemon server.js to start the process. But if you want to set an environment variable for this process, we need to pre-plan that variable to this command. So we say nodeenv, which is that special variable that I just talked about equals development. And if I start this process now, let's take a look. And so right now we have here node N set to development. And so this is the result of doing this console.log off process.env. And so that variable that we have here actually comes from that command. And we can actually define even more if we wanted. So let's just say X is 23 just for testing purposes start the process and now you see the X environment variable is attached to this 23 string all right. So again many packages on npm that we use for Express development actually depend on this environment variable. And so when our project is ready and we are gonna deploy it, we then should change the node N and variable to production. And we will do that of course once we deploy the project by the end of the course. So we set node N and X as environment variables, but we can do a lot more. And that's because we usually use environment variables like configuration settings for our applications. So whenever our app needs some configuration for stuff that might change based on the environment that the app is running in, we use environment variables. For example
// we might use different databases for development and for testing until we could define one variable for each and then activate the right database according to the environment. Also we could set sensitive data like passwords and user name using environment variables. Now it's not really practical to always define all of these variables in the command where we start the application. So imagine we had 10 environmental variables and it would be not really practical to having to write them out all here inside of this command. And so instead what we do is to create a configuration file. So let me go ahead and create config.env. And so env is really the convention for defining a file which is these environment variables. And VS code actually recognizes that and put this configuration icon right in the file. So let's now define this variable here and paste it in here. And we can also use some of this sensitive data that I just mentioned. So let's say the user is Jonas in lowercase and the password is one, two, three, four, five, six. Now as you see, these variable names they're usually always in upper case. So that's kind of a convention that we use. Now in your VS code probably all the text is just white so you have no syntax highlighting. And I have that because they use this .env extension here. So if you want your .env files to look nice like this please go ahead and install that one. So we have user password, let's also define the port on which our app should be running. So that's also kind of a standard variable that is usually in a .env file like this. And let's set this one to 8,000. Now how do we actually connect this .env file with our node application? So we need some way of reading these variables from this file and then saving them as environment variables. Because right now this is just a text file and node JS has no way of knowing that these variables are in here. And so for that the standard is kind of using a npm package called .env. So npm install.env, all right, then let's go over to our server and actually require that module. So const.env is equal to require .env, so simple.
// console.log(process.env);

// ---------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running at ${port}...`);
});
