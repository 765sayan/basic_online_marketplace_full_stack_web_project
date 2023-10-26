const express = require("express");
const { auth } = require("../../middlewares/authMiddlewares");
const { userUserType } = require("../../middlewares/userTypeMiddleware");
const {
  getCart,
  addToCart,
  deleteItemFromCart,
  deleteCart,
} = require("../../controllers/cartControllers");
const router = express.Router();

router.get("", auth, userUserType, getCart);
router.post("", auth, userUserType, addToCart);
router.delete("/:id", auth, userUserType, deleteItemFromCart);
router.delete("", auth, userUserType, deleteCart);

module.exports = router;
