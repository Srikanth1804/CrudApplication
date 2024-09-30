let Crudbase = require("../../Model/Crud.model");

module.exports = (req, res) => {
  let { id } = req.params;
  console.log(id);
  Crudbase.findByIdAndDelete(id)

    .then((data) => {
      res.json({
        status: true,
        msg: "Data Deleted!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        msg: "Data Failed To Delete!",
      });
    });
};
