let Mongoose = require("mongoose");

let UserSchema = new Mongoose.Schema({
  Name: {
    type: String,
  },
  Age: {
    type: Number,
  },
  City: {
    type: String,
  },
});
let Crudbase = Mongoose.model("Userdata", UserSchema);

module.exports = Crudbase;
