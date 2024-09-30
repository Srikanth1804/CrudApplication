let Crudbase = require("../../Model/Crud.model");

module.exports = (req, res) => {
  let { id } = req.params;

  Crudbase.findById(id)
    .then((data) => {
      res.json({
        status: true,
        info: data,
        msg: "Data Geted!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        info: e,
        msg: "Data Failed to get!",
      });
    });
};
