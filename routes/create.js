// Route for adding a new car

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.post("/create", car.create);
};
