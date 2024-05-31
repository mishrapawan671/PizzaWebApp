import mongoose from "mongoose";

const pizzaSchema=new mongoose.Schema(
    {
       
        name:{
            type:String,
            required:true
        },
        price:{
            type: Number,
            required:true,
        },
        quantity:{
            type: Number,
            required:true,
        },
        img:
        {
            type:String,
            required:true
        }
    }
)

const pizzaModel=mongoose.model('pizza',pizzaSchema);
export default pizzaModel;