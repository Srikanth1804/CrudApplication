let Express = require("express");
let Mongoose = require("mongoose");
const CrudRouter = require("./Module/Crud.routes");
let App = Express();
let Cors = require("cors");
require("dotenv").config();

Mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e) => {
    console.log("Database Connection Failed!");
  });

//middlewares
App.use(Express.json());
App.use(Cors());
App.use("/data", CrudRouter);

App.listen(3000, () => {
  console.log(process.env.PORT);
});
