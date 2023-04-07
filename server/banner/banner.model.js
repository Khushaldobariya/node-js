const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name:String,
    url: String,
    image: String,
  },

  {
    // create and update date store
    timestamps: true,
    // version key
    versionKey: false,
  }
);
module.exports = mongoose.model("Banner", bannerSchema);
