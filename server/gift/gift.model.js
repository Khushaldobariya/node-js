const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    name: String,
    coin: Number,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Gift", giftSchema);
