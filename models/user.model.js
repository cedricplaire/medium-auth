const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    tutorials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial"
      }
    ],
    profil : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profil"
    }
  },
    { timestamps: true }
  )
);

module.exports = User;
