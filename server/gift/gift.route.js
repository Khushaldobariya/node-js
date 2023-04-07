const express = require("express");
const multer = require("multer");
const route = express.Router();
const storage = require("../../utilities/multer");
const upload = multer({
  storage,
});

const giftController = require("./gift.controller");
const checkAccessKey = require("../../utilities/checkAccess");

route.get("/", checkAccessKey(), giftController.store);

route.post("/", checkAccessKey(), upload.single("image"), giftController.giftCreate);

route.patch("/:giftId", checkAccessKey(), upload.single("image"), giftController.updateGift);

route.delete("/:giftId" , checkAccessKey(), giftController.deleteGift);

module.exports = route;
