const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Profil = db.profil;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { now } = require("moment");

exports.signup = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err + "save user" })
      return;
    }
    const userprofil = new Profil({
      hobbies: "Visit IWantCode",
      bio: 'Fill with your biography',
      public: true,
      avatar: "profil.png",
      lastconnect: Date.now(),
      owner: newUser._id,
      social: {
        youtube: "No youtube profile",
        twitter: "no twitter account",
        facebook: "https://facebook.com/cedricplaire/",
        github: "https://github.com/cedricplaire/",
        linkedin: "no linkedin account",
        instagram: "no acount",
      },
      address: {
        street: "fill street number and name",
        postalCode: "75000",
        city: "ex: Paris",
        country: "France",
      },
    });
    userprofil.save(function(error) {
      if (error) {
        res.status(500).send(error + "save profil");
        return;
      }
    });
    newUser.profil = userprofil._id

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {      
      Role.findOne({ name: "admin" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .populate("profil", "lastconnect avatar")
    .exec((err, user) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const update = { lastconnect: now() };
      let prof = Profil.findOneAndUpdate({_id: user.profil._id}, update, { new: false });

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 172800 // 48 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        profil: prof._id,
        accessToken: token
      });
    });
};
