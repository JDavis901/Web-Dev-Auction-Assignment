const Joi = require("joi");
const Users = require("../models/user.server.models");
const Core = require("../models/core.server.models");

const addUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/[a-z]/).pattern(/[A-Z]/).min(6).max(64).pattern(/[0-9]/).pattern(/[^A-Za-z0-9]/).required(),
}).unknown(false);

const addLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);


const createItem = (req, res) => {
  if (!req.user || !req.user.user_id){
    return res.sendStatus(401);
  }


  const {error, value} = addItemSchema.validate(req.body);
  if(error){
    return res.status(400).send({
      error_message: error.details[0].message
    })
  }
 

  if (value.name.trim() === "" || value.description.trim() === ""){
    return res.status(400).send({error_message: "name and description cant be blank"});
  }

  if(value.starting_bid <=0){return res.status(400).send({error_message: "starting_bid has to be positive"})};

  const currentDate =  new Date();
  const finishDate = new Date(value.end_date);

  if (finishDate <= currentDate) {
    return res.status(400).send({error_message: "end_date has to be in the future"});
  }


  const itemToInsert = {
    name: value.name,
    description: value.description,
    starting_bid: value.starting_bid,
    start_date: currentDate.toISOString(),
    end_date: finishDate.toISOString(),
    creator_id: req.user.user_id
  };

  Core.insertItem(itemToInsert, (err, item_id)=> {
    if (err) return res.sendStatus(500);
    return res.status(201).send({item_id});
  })
}
                                   ///this needs finishing



const create_user = (req, res) => {
  const {error, value} = addUserSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error_message: error.details[0].message,

    });
  }

  Users.getUserByEmail(value.email, (err, existingUser) => {
    if (err) return res.sendStatus(500);

    if (existingUser) {
      return res.status(400).send({ error_message: "Email already in use" });
    }

    Users.insertUser(value, (err2, user_id) =>{
      if (err2) return res.sendStatus(500);
      return res.status(201).send({user_id});
    })
  });
};



const login = (req, res) => {
  const {error} = addLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error_message: error.details[0].message
    });
  }
  Users.authenticateUser(req.body.email, req.body.password, (err, id) => {
    if (err === 404) return res.status(400).send({error_message: "Invalid email/password supplied"});
    if (err) return res.sendStatus(500)

    Users.getToken(id, (err, token) => {
      if (err) return res.sendStatus(500)

      if (token) {
        return res.status(200).send({user_id: id, session_token: token})
      }
      else {
        Users.setToken(id, (err, token) => {
          if (err) return res.sendStatus(500)
          return res.status(200).send({user_id: id, session_token: token})
        });
      }
    });
  });
}





  const logout = (req, res) => {
    const token = req.get("X-Authorization");
    
    if (!token) return res.sendStatus(401);

    Users.removeToken(token, (err)=> {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    })
  };





  module.exports = {
    create_user,
    login,
    logout,
    createItem
    //   get_user_by_id     
  };
