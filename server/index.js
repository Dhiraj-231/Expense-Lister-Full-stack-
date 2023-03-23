import express from "express";
import mongoose from "mongoose";
import cors from "cors"
const app = express();
await mongoose.connect("mongodb://127.0.0.1:27017");
console.log("Connected successfully");

app.use(cors())
app.get("/", (req, res) => {
  res.send("Hii this is Dhiraj");
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
