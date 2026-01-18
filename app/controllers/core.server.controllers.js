const Core = require("../models/core.server.models"); 
const Joi = require("joi");


const search = (req, res) => res.sendStatus(500);



const addItemSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  starting_bid: Joi.number().required(),
  end_date: Joi.date().iso().required()
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
    if (err) {
        console.log("INSERT ITEM ERROR:", err);  
        return res.sendStatus(500);}
        
    return res.status(201).send({item_id});
  })
}
                                   ///this needs finishing



const get_Item_By_id = (req, res)=>{
  const id = req.params.item_id;

  Core.getItemById(id, (err, item)=> 
    {
    if (err) return res.sendStatus(500);
    if (!item) return res.sendStatus(404);

    return res.status(200).send(item);
  })
}


const add_bid = (req, res) => res.sendStatus(500);
const get_bid_history = (req, res) => res.sendStatus(500);



module.exports = {
    search,
    createItem,
    get_Item_By_id,
    add_bid,
    get_bid_history
};
