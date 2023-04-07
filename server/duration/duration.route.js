const express = require("express");

const route = express.Router();
const checkAccessKey = require("../../utilities/checkAccess");


const durationController = require("./duration.controller");
route.post("/",checkAccessKey(), durationController.createDuration);

route.get("/",checkAccessKey(), durationController.store);

module.exports = route;
