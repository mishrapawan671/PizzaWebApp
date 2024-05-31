import express, { urlencoded } from "express";
import AuthRoutes from "./Routes/AuthRoutes.js";
import MenuRoutes from "./Routes/MenuRoutes.js";
import OrderRoutes from "./Routes/OrderRoutes.js";
import mongoose from "mongoose";
import ProductsRoutes from './Routes/ProductRoutes.js'
import UploadRoutes from './Routes/UploadRoutes.js'
import PizzaModel from "./Models/Pizzaschema.js";
import UserModel from "./Models/Userschema.js";
import OrderModel from "./Models/OrderSchema.js";
import UserProfileModel from './Models/Userschema.js'
import cors from 'cors'
import jsonwebtoken from'jsonwebtoken' ;
import { isJwtAuthenticated } from "./Security/JwtAuth.js";
import multer from "multer";
import appRootPath from "app-root-path";
import fs from 'fs'
import path from 'path'
import { Console } from "console";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix+file.originalname)
  }
})

/** @type {import("express").RequestHandler} */
function customefilefilter(req,file,cb)
{
  let ext=file.originalname+""
  const exten=ext.split('.')[1];
  switch(exten)
  {
    case 'jpeg':
      cb(null,true)
      break;
    case 'jpg':
      cb(null,true)
      break;
    case 'png':
      cb(null,true)
      break;
    default:
     cb(null,false);

  }
  
}

const uploadinPublic=multer({storage:storage,fileFilter:customefilefilter})

const corsOptions = {
  origin: '*', // Allow all origins, adjust this for production use
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Add all your custom headers here
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision', 'token', 'Custom-Header-2'] // Expose any custom headers if needed
};

const app = express();
const port = 8080;
const DBURL='mongodb://localhost:27017/PizzaDB'

mongoose.connect(DBURL);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRoutes);
app.use(isJwtAuthenticated)
app.use("/logout", AuthRoutes);
app.use("/menu", MenuRoutes);
app.use("/order", OrderRoutes);
app.use("/product",uploadinPublic.single('image'),ProductsRoutes)
app.use("/upload",uploadinPublic.single('file'),UploadRoutes);








app.listen(port,initializeData);


async function  initializeData()
{
   try {
  let  odata=await OrderModel.find({})
  if(odata.length===0)
  {
      const orders = path.resolve('DummyData/orders.json');
      const fileContent = fs.readFileSync(orders, 'utf8');
      const Orderdata = JSON.parse(fileContent);
      const oresult=await OrderModel.insertMany(Orderdata);

  }

 let pdata=await PizzaModel.find({})
 if(pdata.length===0)
  {
  const pizza = path.resolve('DummyData/pizzas.json');
  const pizzafile = fs.readFileSync(pizza, 'utf8');
  const pizzaData = JSON.parse(pizzafile);
  const presult=await PizzaModel.insertMany(pizzaData);
 }

 let udata=await UserModel.find({});
 if(udata.length===0)
  {
  const user = path.resolve('DummyData/users.json');
  const userfile = fs.readFileSync(user, 'utf8');
  const userdata = JSON.parse(userfile);
  const uresult=await UserModel.insertMany(userdata)
}


  }
  catch(error)
  {
    console.log(error)
  }

}
