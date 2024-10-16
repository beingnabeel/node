// we need the dotenv and the database connection becoz this script runs completely independent from the express application
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.MONGO_URi.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database connection established..");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

//   READ JSON FILE
// fs.readFileSync("tours-simple.json", "utf-8"); this basically returns json we need to convert it into js object using json.parse
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

// import data into db
// now we can paas this javascript object into the create method.
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded.!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Deleting all the existing data from the database.
// when you use deleteMany and then don't pass any argument then it will delete all the existing data fromt the collection.
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted.!");
  } catch (err) {
    console.log(err);
  }
  process.exit(); //this is an aggressive way of stopping an application.
};

// mongoose is just a layer of abstraction on top of mongodb.

// we will run this script from the command line without calling any function here.

console.log(process.argv);

// it will import the data when we specify the --import option
// it will delete the data when we specify --delete option
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
