// Route for adding a new car

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.post("/api/create", car.create);
};
