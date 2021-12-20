const Shop = require("../../db/models/shop/index");

module.exports.getAllShops = (req, res) => {
  Shop.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewShop = (req, res) => {
  const body = {};
	for (let key in req.body) {
		body[key] = req.body[key].trim();
	}
  if (
    body.hasOwnProperty("shop") &&
    body.hasOwnProperty("money") &&
    body.shop.trim() &&
    body.shop.trim().length <= 16 &&
    +body.money &&
    body.money > 0 &&
    body.money <= 9999999
  ) {
    const shop = new Shop(body);
    shop.save().then(() => {
      Shop.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Invalid parameters");
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
    res.status(422).send("Error! Invalid parameters!");
  }
};

module.exports.changeShop = (req, res) => {
  const body = req.body;
  const obj = {};

  if (body.hasOwnProperty("_id") && body._id.trim()) {
    obj._id = body._id.trim();
    if (
      body.hasOwnProperty("shop") &&
      body.shop.trim() &&
      body.shop.trim().length <= 16
    ) {
      obj.shop = body.shop.trim();
    }
    if (body.hasOwnProperty("date") && body.date.trim()) {
      obj.date = body.date.trim();
    }
    if (
      body.hasOwnProperty("money") &&
      +body.money &&
      body.money > 0 &&
      body.money <= 9999999
    ) {
      obj.money = body.money;
    }
    Shop.updateOne({ _id: obj._id }, obj).then(() => {
      Shop.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Invalid parameters!");
  }
};
