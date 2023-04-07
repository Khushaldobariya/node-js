const express = require("express");
const route = express.Router();
const planController = require("./plan.controller");
const checkAccessKey = require("../../utilities/checkAccess");

route.post("/", checkAccessKey(), planController.create);

route.get("/", checkAccessKey(), planController.store);

route.patch("/", checkAccessKey(), planController.updatePlan);

route.delete("/", checkAccessKey(), planController.delete);

route.put("/", checkAccessKey(), planController.handelActiveToggle);

module.exports = route;
