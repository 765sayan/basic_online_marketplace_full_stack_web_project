const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/authMiddlewares");

const {
  allProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getOrderedProducts,
} = require("../../controllers/adminProductControllers");

const {
  adminUserType,
  userUserType,
} = require("../../middlewares/userTypeMiddleware");
const {
  buyProduct,
  seeOrderedProducts,
  getAllProducts,
  cancelProduct,
  getImage,
  getSetOfProducts,
} = require("../../controllers/userProductControllers");

router.get("", auth, adminUserType, allProducts);

router.post("", auth, adminUserType, addProduct);
router.delete("/:id", auth, adminUserType, deleteProduct);
router.put("/:id", auth, adminUserType, updateProduct);
router.get("/ordered", auth, adminUserType, getOrderedProducts);

router.post("/buy", auth, userUserType, buyProduct);
router.get("/buy", auth, userUserType, seeOrderedProducts);

router.get("/list", getSetOfProducts);
router.delete("/buy/:id", auth, userUserType, cancelProduct);
router.get("/file", getImage);

module.exports = router;
