const { authJwt } = require("../middlewares");
const profils = require("../controllers/profil.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/profil/:id", [authJwt.verifyToken], profils.userProfil);

  // Update profil (current auth profil only)
  app.put('/api/profil/:id/edit', [authJwt.verifyToken], profils.updateProfil);

  // Delete profil (Admin role required)
  app.delete('/api/profil/delete/:id', [authJwt.verifyToken], 
    profils.deleteProfil
  );
};
