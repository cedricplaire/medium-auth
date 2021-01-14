const controller = require("../controllers/message.controller");

module.exports = function(app) {
  app.post('/message/create', controller.create);
  app.put('/message/update/:id', controller.update);
  app.get('/message/findall', controller.findAll);
  app.get('/message/findone/:id', controller.findOne);
  app.delete('/message/delete/:id', controller.deleteOne);
  app.delete('/message/delete-all', controller.deleteAll);
  app.get('/message/find-published', controller.findAllPublished);
  app.get('/message/find-by-name', controller.findByAuthor);
};
