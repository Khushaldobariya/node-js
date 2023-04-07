const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    type: String,
    mobileNo: Number,
    image: String,

    plan: { type: mongoose.Types.ObjectId, ref: "plan", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Host", hostSchema);
