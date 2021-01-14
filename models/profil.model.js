const mongoose = require("mongoose");

const Profil = mongoose.model(
  "Profil",
  new mongoose.Schema({
    hobbies: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    lastconnect: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
      street: {
        type: String,
      },
      postalCode: {
        type: Number,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
    { timestamps: true }
  )
);

module.exports = Profil;