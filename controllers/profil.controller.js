const db = require("../models");
const Profil = db.profil;

// get One profil by Id
exports.userProfil = (req, res) => {
  const id = req.params.id;
  Profil.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ Profil: "Not found Profil with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ Profil: "Error retrieving Profil with id=" + id });
    });
};

exports.updateProfil = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  Profil.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profil with id=${id}. Maybe Profil was not found!`,
        });
      } else res.send({ message: "Profil was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profil with id=" + id,
      });
    });
};

// Delete a Profil with the specified id in the request
exports.deleteProfil = (req, res) => {
  const id = req.params.id;

  Profil.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profil with id=${id}. Maybe Profil was not found!`
        });
      } else {
        res.send({
          message: "Profil was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Profil with id ${id}`
      });
    });
};
