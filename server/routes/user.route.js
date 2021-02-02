const Users = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  app.get("/api/users", authenticate, Users.getAll);
  app.get("/api/users/:id", Users.getUser);
  app.get("/api/logout", Users.logout);
};
