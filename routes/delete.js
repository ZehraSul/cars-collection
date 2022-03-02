// Route for deleting a car

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.delete("/delete", car.deleteCar);
};
