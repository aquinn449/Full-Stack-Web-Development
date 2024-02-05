const users = require("../controllers/users-controller"),
auth = require('../lib/authentication');

module.exports = function(app) {

    app.route("/users")
    .get(auth.isAuthenticated, users.getAll)
    .post(auth.isAuthenticated, users.create);

     app.route("/login")
     .post(users.login);

    app.route("/logout") 
    .post(auth.isAuthenticated, users.logout); 
}