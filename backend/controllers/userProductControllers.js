const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const ProductsOrdered = require("../models/productsOrderedModel");
const fs = require("fs");

const path = require("path");

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find().populate("seller", ["name"]);

    res.json({
      products: products,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldn't get products" });
  }
});

const buyProduct = asyncHandler(async (req, res, next) => {
  if (req.user && req.body) {
    const productId = req.body.productid;
    try {
      const product = await Product.findById(productId);
      try {
        const productsOrdered = await ProductsOrdered.create({
          productid: product.id,
          userid: req.user.id,
          sellerid: product.seller,
        });

        return res.json(productsOrdered);
      } catch (error) {
        return res.status(500).json({ msg: "products not ordered" });
      }
    } catch (error) {
      res.status(500).json({ msg: "product not found" });
    }
  } else {
    res.status(500).json({ msg: "no user" });
  }
});

const seeOrderedProducts = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const id = req.user.id;
    try {
      const productsOrdered = await ProductsOrdered.find({
        userid: id,
      })
        .populate("productid", ["name"])
        .populate("sellerid", ["name"]);

      res.json({
        productsordered: productsOrdered,
      });
    } catch (error) {
      res.status(500).json({ msg: "did not get products ordered" });
    }
  } else {
    res.status(500).json({ msg: "no user" });
  }
});

const cancelProduct = asyncHandler(async (req, res) => {
  if (req.user && req.params.id) {
    const productId = req.params.id.toString();
    const id = req.user.id;

    try {
      const productOrdered = await ProductsOrdered.find({
        userid: id,
        _id: productId,
      })
        .populate("productid", ["name"])
        .populate("sellerid", ["name"]);
      if (productOrdered && productOrdered.length !== 0) {
        productOrdered[0].delete();
        res.json(productOrdered[0]);
      } else {
        res.status(500).json({ msg: "Order couldn't be cancelled" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error" });
    }
  }
});

const getImage = asyncHandler(async (req, res) => {
  try {
    // let file = fs.open(path.join(__dirname, "../", "./files", "cartIcon.svg"));
    let filePath = path.join(__dirname, "../", "./files", "cartIcon.svg");
    res.sendFile(fs.open(filePath));
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

module.exports = {
  getAllProducts,
  buyProduct,
  seeOrderedProducts,
  cancelProduct,
  getImage,
};
