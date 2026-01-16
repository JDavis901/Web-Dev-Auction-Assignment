const users = require("../controllers/user.server.controllers")

module.exports = function(app){
    app.route("/users")
        .post(users.create_user);

    app.route("/login")
        .post(users.login);

    app.route("/logout")
        .post(users.logout);


  // app.route("/user_id")
       // .get(users.get_user_by_id);
    

}