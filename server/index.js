import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dataBaseConnection from "./DataBase/dataBaseConnection.js";
import passport from "passport";
import passportConfig from "./Config/passport.js";

import routes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config()
const app = express();
dataBaseConnection();
console.log("Connected successfully");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport)
app.use('/',routes);

app.get("/", (req, res) => {
  res.send("Hii this is Dhiraj");
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
