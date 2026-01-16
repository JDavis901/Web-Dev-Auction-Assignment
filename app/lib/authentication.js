const Users = require("../models/user.server.models");

const authenticate = (req, res, next) => {
    const token = req.get("X-Authorization");
    if (!token) return res.sendStatus(401);



    Users.getUserByToken(token, (err, user)=> {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
    })
    
}

module.exports = {authenticate};