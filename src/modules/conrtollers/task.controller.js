const Shop = require("../../db/models/shop/index");

module.exports.getAllShops = (req, res) => {
  Shop.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewShop = (req, res) => {
  if (req.body.hasOwnProperty("shop") && req.body.hasOwnProperty("money")) {
    const shop = new Shop(req.body);
    shop.save().then(() => {
      Shop.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
};

module.exports.deleteShop = (req, res) => {
  const id = req.query._id;
  if (id) {
    Shop.deleteOne({ _id: id }).then(() => {
      Shop.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
};

module.exports.changeShop = (req, res) => {
  const body = req.body;
  if (
    body.hasOwnProperty("_id") &&
    (body.hasOwnProperty("shop") ||
      body.hasOwnProperty("date") ||
      body.hasOwnProperty("money"))
  ) {
    Shop.updateOne({ _id: body._id }, body).then(() => {
      Shop.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
};
