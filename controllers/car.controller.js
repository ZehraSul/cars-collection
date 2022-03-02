const Cars = require("../models/car.model.js");
const mongoose = require("mongoose");

/* Add new car to database, pass in object with the data from the user inputs.*/
exports.create = function (req, res) {
  let newCar = new Cars({
    make: req.body.make,
    model: req.body.model,
    registration: req.body.registration,
    owner: req.body.owner,
  });
  /* If the operation errors send back an error msg if it succeeds send back the data*/
  newCar.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred" });
    } else {
      res.send(data);
    }
  });
};

/* Display all the cars */
exports.displayAll = function (req, res) {
  Cars.find({}, function (err, cars) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
    } else {
      res.send(cars);
    }
  });
};

/* Find a one document and update it */
exports.updateById = function (req, res) {
  /* Find one document by using the id automatically created by MongoDB */
  let query = { _id: req.body.id };
  Cars.findOneAndUpdate(
    query,
    /* then update the values of that object with the new information from the user input */
    {
      make: req.body.make,
      model: req.body.model,
      registration: req.body.registration,
      owner: req.body.owner,
    },
    { upsert: true },
    // Error handling
    function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred." });
      } else {
        res.send(doc);
      }
    }
  );
};

/* Find a document using the id created by MongoDB and delete it.*/
exports.deleteCar = function (req, res) {
  Cars.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
    }
    res.send({ msg: "Car deleted" });
  });
};

/* Find all the documents where the model of the car is less than 2017 making the car older than 5 years */
exports.displayOlderThanFiveYears = function (req, res) {
  Cars.find({ model: { $lt: 2017 } }, function (err, cars) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error ocurred." });
    } else {
      res.send(cars);
    }
  });
};

/* Update all the documents with the value entered by a user for a specific field */
exports.updateAll = function (req, res) {
  // Create a updateDoc object
  let updateDoc = { $set: {} };
  /* To the UpdateDoc object, add(or if it already exists, update) a field using the field value from the user input from the "Edit all" modal. Make the value, the information added by the user in the "edit all" modal */
  updateDoc["$set"][req.body.field] = req.body.updateText;
  /* Get all documents and apply the update */
  Cars.updateMany({}, updateDoc, function (err, docs) {
    if (err) {
      res.status(500).send({ message: "An error ocurred" });
    } else {
      res.send(docs);
    }
  });
};
