// Route to update all cars

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.put("/updateAll", car.updateAll);
};
