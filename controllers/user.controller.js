const { authJwt } = require("../middlewares");
const db = require("../models");
const multer = require("multer");
const { tutorials, user } = require("../models");
const User = db.user;
const Role = db.role;
const Tutorial = db.tutorials;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  
  /* const queryU = await User.countDocuments({});
  const queryT = await Tutorial.countDocuments({});
  console.log(req);
  let result = {
    message: "Latest informations of website ! View and manage website ressources",
    userCount: queryU,
    tutoCount: queryT,
  };
  res.json(result); */
  let userRes, tutoRes = [];
  User.find()
    .populate("roles", "name")
    .populate("profil", "-__v")
    .populate("tutorials", "-__v")
    .exec((err, users) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(users);
    });

  
  /* let result = {
    message: "Latest informations of website ! View and manage website ressources",
    allUsers: usersLst,
    allTutos: tutosLst,
  };
  return res.status(200).send({result}); */
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: authorities,
      });
    });
};

exports.getFullUser = (req, res) => {
  const id = req.params.id;
  //console.log(id);
  User.findById(id)
    .populate("roles", "-__v")
    .populate("tutorials", "title description createdAt updatedAt")
    .populate("profil", "hobbies bio public avatar lastconnect")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({user});
    });
    //console.log(user);
};

exports.getAllUsers = (req, res) => {
  User.find()
    .populate("roles", "-__v")
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      let newUser = [];
      let tmpUser = {};
      users.map((user, index) => {
        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        tmpUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          roles: authorities
        }
        newUser.push(tmpUser);
      });
      res.status(200).send(newUser);
    });
};

// Find User by username
exports.findByName = (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(400).send({
      message: "You need to send a name as parameter"
    });
  }
  User.find({ username: name })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving User:${name}`
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res, next) => {
  let imagePath = req.body.imagePath;
  const url = req.protocol + "://" + req.get("host")
  if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
  }
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      }
      else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

exports.addRole = (req, res) => {
  const userId = req.userId;
  const role = req.role;
  Role.findOne({name: role})
    .then(rolefound => {
      if (!roleFound) {
        res.send({message: `Role: ${roleFound} was not found in DB !`});
        return
      }
      User.findOne({_id: userId})
        .then(user => {
          user.roles.push(roleFound._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: `User role (${roleFound}) was added successfully!` });
          });
        })
    })
}

exports.countUsers = (req, res) => {
  User.countDocuments({}, function(err, rest){
    if (err) {
      console.log("error occured :" + err);
    }
    else {
      res.send(rest);
    }
  });
}

exports.countPublicUsers = (req, res) => {
  User.countDocuments({public: true})
    .then(num => {
      if (!num) {
        res.status(500).send("a error is occured !")
      };
      res.status(200).send(num);
    });
}