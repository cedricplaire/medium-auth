const Message = require("../models/message.model");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const message = new Message({
    content: req.body.content,
    author: req.body.author,
    published: req.body.published ? req.body.published : false
  });

  // Save Message in the database
  Message
    .save(message)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the message."
      });
    });
};

// Retrieve all Messages of author from the database.
exports.findByAuthor = (req, res) => {
  const author = req.query.author;
  var condition = author ? { author: { $regex: new RegExp(author), $options: "i" } } : {};

  Message.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  Message.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    });
};

// Find a single message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Message.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Message with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Message with id=" + id });
    });
};

// Update a Message by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Message.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Message with id=${id}. Maybe Message was not found!`
        });
      } else res.send({ message: "Message was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Message with id=" + id
      });
    });
};

// Delete a Message with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Message.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
        });
      } else {
        res.send({
          message: "Message was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id
      });
    });
};

// Delete all Messages from the database.
exports.deleteAll = (req, res) => {
  Message.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Messages were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Messages."
    });
  });
};

// Find all published Messages
exports.findAllPublished = (req, res) => {
  Message.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });
};