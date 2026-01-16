const Joi = require("joi");

const Users = require('../models/user.server.models');

const addUserSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
});

const addLoginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
});


const create_user = (req, res) => {
  const { error, value } =  addUserSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error_message: error.details[0].message, 

    });
  }

  Users.getUserByEmail(value.email, (err, existingUser)=> {
    if (err) return res.sendStatus(500);

    if (existingUser) {
      return res.status(400).send({ error_message: "Email already in use" });
    }

    Users.insertUser(
      value.first_name,
      value.last_name,
      value.email,
      value.password,
      null,                                           // no salt yet
      (err2, user_id) => {
        if (err2) return res.sendStatus(500);
        return res.status(201).send({ user_id });
      }
    );
  });
};



const login = (req, res) => {
    const { error, value } = addLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).send({
             error_message: error.details[0].message});
    }
    
    return res.sendStatus(500);

}






const logout = (req, res) => {
    return res.sendStatus(500);
};





module.exports = {
    create_user,
    login,
    logout,
 //   get_user_by_id     
};
