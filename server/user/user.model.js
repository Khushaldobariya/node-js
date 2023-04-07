const mongoose = require("mongoose");
const plan = require("../Plan/plan.controller");

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    type:String,
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("User", userSchema);
