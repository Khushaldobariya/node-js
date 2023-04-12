const express = require("express");
const route = express.Router();

const userController = require("./user.controller");

const checkAccessKey = require("../../utilities/CheckAccess");

route.post("/", checkAccessKey(), userController.userCreate);

route.get("/", checkAccessKey(), userController.store);

route.patch("/", checkAccessKey(), userController.updateUser);

route.post("/loginUser", checkAccessKey(), userController.LoginUser);

route.patch("/purchasePlan", checkAccessKey(), userController.purchasePlan);

module.exports = route;
