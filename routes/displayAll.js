// Route for displaying all the cars in the database

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.get("/api/displayAll", car.displayAll);
};
