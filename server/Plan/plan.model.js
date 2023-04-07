const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    coin: Number,
    dollar: Number,
    level: Number,
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("plan", planSchema);
