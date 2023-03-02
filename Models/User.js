const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const WordGameModel = mongoose.model("gameuser", userSchema);

module.exports = { WordGameModel };
