let Crudbase = require("../../Model/Crud.model");

module.exports = (req, res) => {
  let { name, age, city } = req.body;

  Crudbase.create({
    Name: name,
    Age: age,
    City: city,
  })
    .then((data) => {
      res.json({
        status: true,
        info: data,
        msg: "Data Created Succesfully!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        info: e,
        msg: "Data Failed to create!",
      });
    });
};
