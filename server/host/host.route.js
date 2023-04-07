const express = require("express");
const route = express.Router();
const multer = require("multer");
const storage = require("../../utilities/multer");
const checkAccessKey = require("../../utilities/CheckAccess");

const upload = multer({
  storage,
});

const hostController = require("./host.controller");

route.post(
  "/",
  checkAccessKey(),
  upload.single("image"),
  hostController.create
);

route.get("/", checkAccessKey(), hostController.store);
module.exports = route;
