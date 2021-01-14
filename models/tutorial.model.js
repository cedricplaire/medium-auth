const mongoose = require("mongoose");

const Tutorial = mongoose.model(
  "Tutorial",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      content: String,
      published: Boolean,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);

module.exports = Tutorial;
