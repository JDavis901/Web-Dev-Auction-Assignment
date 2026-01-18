const users = require("../controllers/user.server.controllers")
const auth = require("../lib/authentication")

module.exports = function(app){
    app.route("/users")
        .post(users.create_user);

    app.route("/login")
        .post(users.login);

    app.route("/logout")
        .post(auth.authenticate, users.logout);

    app.route("/users/:user_id")
        .get(users.get_User_By_Id)



}