const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

const getCart = asyncHandler(async (req, res) => {
  if (req.user) {
    let userId = req.user.id;
    console.log(userId);
    try {
      const CartItems = await Cart.find({ userid: userId })
        .populate("productid")
        .populate("sellerid", ["name"]);
      res.status(200).json({ cartitems: CartItems, length: CartItems.length });
    } catch (error) {
      res.status(500).json({ msg: "Error getting cart" });
    }
  } else {
    res.status(500).json({ msg: "No User" });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  if (req.user && req.body) {
    let userId = req.user.id;
    let cartItem = req.body.cartitem;

    try {
      const cartItemIfExist = await Cart.find({
        productid: cartItem.productid,
      });

      if (cartItemIfExist && cartItemIfExist.length !== 0) {
        res.status(400).json({ msg: "Cart Item Already Exists" });
      } else {
        const cartItemObject = await Cart.create({
          productid: cartItem.productid,
          sellerid: cartItem.sellerid,
          userid: userId,
        });

        res
          .status(200)
          .json(
            await (
              await cartItemObject.populate("productid")
            ).populate("sellerid", ["name"])
          );
      }
    } catch (error) {
      res.status(500).json({ msg: "Error adding item to cart" });
    }
  } else {
    res.status(500).json({ msg: "No User" });
  }
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  if (req.user && req.params) {
    let cartItemId = req.params.id;
    let userId = req.user.id;

    try {
      const cartItem = await Cart.findById(cartItemId);
      await cartItem.delete();

      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ msg: "Error deleting item from cart" });
    }
  } else {
    res.status(500).json({ msg: "No User" });
  }
});

const deleteCart = asyncHandler(async (req, res) => {
  if (req.user) {
    let userId = req.user.id;
    try {
      const cartItem = await Cart.find({ userid: userId });
      if (cartItem && cartItem.length !== 0) {
        for (let i = 0; i < cartItem.length; i++) {
          cartItem[i].delete();
        }
        res.status(200).json({ cartitems: [] });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error deleting cart items" });
    }
  } else {
    res.status(500).json({ msg: "No User" });
  }
});

module.exports = { getCart, addToCart, deleteItemFromCart, deleteCart };
