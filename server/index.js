import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/transaction.js";
const app = express();
await mongoose.connect("mongodb://127.0.0.1:27017");
console.log("Connected successfully");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hii this is Dhiraj");
});

app.get("/transaction",async(req,res)=>{
  const transaction=await Transaction.find({});
  res.json({data:transaction});
});

app.post("/transaction", async(req, res) => {
  const { Amount, Detail, Date } = req.body;
  const transaction = new Transaction({
    Amount,
    Detail,
    Date
  });
  const data=await transaction.save();
  res.status(200).json({
    message:"Success"
  })
})

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
