const express = require("express");

const multer = require("multer");
const storage = require("../../utilities/multer");
const upload = multer({
  storage,
});
const route = express.Router();

const checkAccessKey = require("../../utilities/checkAccess");

const bannerController = require("./banner.controller");

route.get("/", checkAccessKey(), bannerController.index);

route.post(
  "/",
  checkAccessKey(),
  upload.single("image"),
  bannerController.bannerStore
);

route.patch(
  "/",
  checkAccessKey(),
  upload.single("image"),
  bannerController.update
);

// params passing id
// route.patch("/:bannerId", bannerController.update);

route.delete("/", checkAccessKey(), bannerController.delete);

module.exports = route;
