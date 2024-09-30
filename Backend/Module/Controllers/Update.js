let Crudbase = require("../../Model/Crud.model");

module.exports = (req, res) => {
  let { id } = req.params;
  let { name, age, city } = req.body;
  Crudbase.findByIdAndUpdate(
    id,
    { $set: { Name: name, Age: age, City: city } },
    { new: true }
  )
    .then((data) => {
      res.json({
        status: true,
        info: data,
        msg: "Data Updated!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        info: e,
        msg: "Data failed To Update!",
      });
    });
};
