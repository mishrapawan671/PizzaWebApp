import { overwriteMiddlewareResult } from "mongoose";
import OrderModel from "../Models/OrderSchema.js";
import userModel from "../Models/Userschema.js";

const addOrder = async (req, res) => {
  try{
     let orderdetail=req.body;
     let result=await OrderModel.create(orderdetail);
    res.send(result);
  }catch(error)
  {
    res.
    send(error);
  }
};
const deleteOrder = async (req, res) => {
  let id = req.params["id"];
  res.send("order canceled " + id);
};
/** @type {import("express").RequestHandler} */
const getAllOrder = async (req, res) => {

  let orderDetails;
  if(req.user.role==="seller")
  {
    orderDetails=await OrderModel.find({});
  }
  else
  {
    orderDetails=await OrderModel.find({username:req.user.username})
  }
  
  if(orderDetails)
  {
    res.status(200).send(orderDetails);
  }

  
};
const getOrderbyPage = async (req, res) => {
  res.send("get order by page");
};
const getOrderbyId = async (req, res) => {
  res.send("Order by id");
};
/** @type {import("express").RequestHandler} */
const changeStatus = async (req, res) => {
  try{
     const {id,status}=req.body;
     const result=await OrderModel.findByIdAndUpdate({_id:id},{Status:status})
     if(result._doc!==null)
      {
        res.status(200).send()

      }
      else
      {
        res.status(500).send()
      }
  
  }
  catch(error)
  {
    res.status(500).send()
  }
  
};


export { addOrder, deleteOrder, getAllOrder, getOrderbyPage, getOrderbyId,changeStatus };
