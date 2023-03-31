import mongoose from "mongoose";

const {Schema}=mongoose;

const TransactionSchema=new Schema({
    Amount:Number,
    Detail:String,
    user_id:Object,
    Category_id:String,
    Date:{type:Date,default:new Date()},
     
    createdAt:{type:Date,default:Date.now}
});
 
export default new mongoose.model("Transaction",TransactionSchema);