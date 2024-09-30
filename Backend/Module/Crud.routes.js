let Express = require("express");
const AddData = require("./Controllers/AddData");
const GetData = require("./Controllers/GetData");
const Deletedata = require("./Controllers/Deletedata");
const Getbyid = require("./Controllers/Getbyid");
const Update = require("./Controllers/Update");

let CrudRouter = Express.Router();

CrudRouter.post("/adddata", AddData);
CrudRouter.get("/getdata", GetData);
CrudRouter.delete("/deletedata/:id", Deletedata);
CrudRouter.get("/getbyid/:id", Getbyid);
CrudRouter.put("/updatedata/:id", Update);

module.exports = CrudRouter;
