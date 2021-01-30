const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/all", controller.allAccess);

  app.get("/api/users/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/users/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // get one user by id
  app.get('/api/users/:id', [authJwt.verifyToken], controller.getUser);

  // get one user by name
  app.get('/api/users/name/:id', [authJwt.verifyToken], controller.findByName);

  // get one full user by id
  app.get('/api/user-full/:id', [authJwt.verifyToken], controller.getFullUser);

  // get all users (Admin role required)
  app.get('/api/userslist', [authJwt.verifyToken], controller.getAllUsers);

  // Update user (current auth user only)
  app.put('/api/users/:id/edit', [authJwt.verifyToken], controller.updateUser);

  // Delete user (Admin role required)
  app.delete('/api/users/:id/delete', [authJwt.verifyToken, authJwt.isAdmin], 
    controller.deleteUser
  );

  // Add role to user (Admin role required)
  app.put('/api/users/:id/role-add', [authJwt.verifyToken, authJwt.isAdmin], 
    controller.addRole
  );

  // Add friend to user (Logged in required)
  app.put('/api/users/:id/role-add', [authJwt.verifyToken], 
    controller.addFriend
  );

  app.get('api/users/count', [authJwt.verifyToken], controller.countUsers);
  app.get('api/users/countpublic', [authJwt.verifyToken], controller.countPublicUsers);
};
