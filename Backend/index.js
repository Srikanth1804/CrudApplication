let Express = require("express");
let Mongoose = require("mongoose");
const CrudRouter = require("./Module/Crud.routes");
let App = Express();
let Cors = require("cors");
App.use(
  Cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
require("dotenv").config();
App.use(Express.json());

Mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e) => {
    console.log("Database Connection Failed!", e);
  });

//middlewares

App.use("/data", CrudRouter);

App.listen(3000, () => {
  console.log(process.env.PORT);
});
