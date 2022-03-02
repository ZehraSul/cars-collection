// Route for displaying all cars that are older than 5 years

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.get("/api/displayOlder", car.displayOlderThanFiveYears);
};
