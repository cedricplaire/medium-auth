const mongoose = require("mongoose");

const Avatar = mongoose.model(
  "Avatar",
  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: String
  })
);

module.exports = Avatar;