let Express = require("express");
let Mongoose = require("mongoose");
const CrudRouter = require("./Module/Crud.routes");
let App = Express();
let Cors = require("cors");
require("dotenv").config();
App.use(Express.json());
App.use(Cors());

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
