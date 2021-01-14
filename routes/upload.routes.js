const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

let routes = app => {
  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(req.file);
    });
  });

  app.get("/preview-avatar", (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/public/";
    res.send(directoryPath + fileName);
  });
};

module.exports = routes;
