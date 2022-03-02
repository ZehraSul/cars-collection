// Route to update a single car

module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.put("/update", car.updateById);
};
