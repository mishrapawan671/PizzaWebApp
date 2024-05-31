
import { Console, error } from "console";
import  pizzaModel from "../Models/Pizzaschema.js";
import * as fs from 'fs';
import path from 'path'; 
import mongoose from 'mongoose'

const __dirname=path.resolve()+"//public//";

/** @type {import("express").RequestHandler} */
const getProduct = async (req, res) => {
  
    try{
       
      let data=await pizzaModel.find({}) 
      res.send(data);
    }
    catch(error)
    {
      res.send(error);
    }
  
};



/** @type {import("express").RequestHandler} */
const addproducts =async(req,res)=>{

  try{
  let product={'name':req.body.name,'quantity':Number(req.body['quantity']),'price':Number(req.body['price'])}
   product={...product,'img':req.file['filename']}
   
   
   const result= await pizzaModel.create(product)
    console.log(result);
    res.status(200);
    res.send(result)
  }
  catch(error)
  {
    console.log(error)
    res.send('error')
  }
   
}

/** @type {import("express").RequestHandler} */
const deleteproducts=async (req,res)=>{
  try{
   
     

     const {_id,name,img,price,quantity}=req.body
     const fullpath=__dirname+img;

      const result = await pizzaModel.findOneAndDelete({name:name,img:img})

      if(result.errors==undefined)
      {
         fs.unlink(fullpath,(error=>{

          if(error===null)
            {
             res.status(200).send(result._doc);
            }
          else
            {
             res.status(500).send("error while deleting the image");
            }
         }))
      }
    
  }
  catch(error)
  {
    res.status(500).send();
  }
}

/** @type {import("express").RequestHandler} */
const updateproducts= async (req,res)=>{
  try{
  
    const newimgname=req.file?.filename;
    if(newimgname===undefined)
      {
        const{id,price,quantity,name}=req.body
        const result= await pizzaModel.findOneAndUpdate({_id:id},{price:price,quantity:quantity,name:name})
        if(result._doc!==undefined)
          {
            console.log(result);
            res.status(200).send()
          }
          else
          {
            res.status(500).send()
          }
      }
      else
      {
        const{id,price,quanity,name,oldImg}=req.body
        const fullpath=__dirname+oldImg;
        fs.unlink(fullpath,(async (error)=>{

          if(error===null)
            {
              const result= await pizzaModel.findOneAndUpdate({_id:id},{price:price,quanity:quanity,name:name,img:newimgname})
              if(result._doc!==undefined)
               {
                console.log(result);
                 res.status(200).send()
               }
              else
               {
                 res.status(500).send()
               }
            }
          else
            {
             res.status(500).send("error while deleting the image");
            }
         }))
       
      }

  }
  catch(error)
  {
    res.status(500).send();
  }
}

export { getProduct,addproducts,deleteproducts,updateproducts};
