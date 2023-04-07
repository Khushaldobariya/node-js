const mongoose = require("mongoose");

const durationSchema = new mongoose.Schema(
  {
    callerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name:  {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    reserverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: String,
    duration: Number,
    coin: Number,
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("duration", durationSchema);
