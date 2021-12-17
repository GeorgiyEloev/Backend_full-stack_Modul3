const express = require("express");
const router = express.Router();

const {
  getAllShops,
  createNewShop,
  deleteShop,
  changeShop,
} = require("../conrtollers/task.controller");

router.get("/allShops", getAllShops);
router.post("/createShop", createNewShop);
router.patch("/updateShop", changeShop);
router.delete("/delShop", deleteShop);

module.exports = router;
