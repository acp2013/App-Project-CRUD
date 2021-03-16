const { authJwt } = require("../middlewares");
const controller = require("../controllers/crud.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/crud/all",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.publicContent
  );

  app.post(
    "/api/crud",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.create
  );

  app.get(
    "/api/crud",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.findAll
  );

  app.get(
    "/api/crud/published",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.findAllPublished
  );

  app.get(
    "/api/crud/:id",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.findOne
  );

  app.put(
    "/api/crud/:id",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.update
  );

  app.delete(
    "/api/crud/:id",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.delete
  );

  app.delete(
    "/api/crud",
    [
        authJwt.verifyToken, 
        authJwt.isModerator
    ],
    controller.deleteAll
  );
  
};
