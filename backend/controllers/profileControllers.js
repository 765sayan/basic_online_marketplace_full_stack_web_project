const asyncHandler = require("express-async-handler");
const UserTypeFieldEdit = require("../models/userTypeFieldEditModel");
const User = require("../models/userModel");
const ProductsOrdered = require("../models/productsOrderedModel");
const Product = require("../models/productModel");

const { hash_string } = require("../utils/encryptString");
const { userTypes } = require("../utils/importantVariables");

const getProfile = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const userid = req.user.id;

    try {
      const user = await User.findById(userid);
      const userInfo = user.toJSON();
      delete userInfo.password;
      res.json(userInfo);
    } catch (error) {
      res.json({ msg: "user not found" });
    }
  } else {
    res.json({ msg: "no user" });
  }
});

const editProfile = asyncHandler(async (req, res, next) => {
  if (req.user && req.body) {
    const userid = req.user.id;
    const data = req.body;

    try {
      const user = await User.findById(userid);
      let previousUserType = user.usertype;
      data.name ? (user.name = data.name) : null;
      0 <= data.usertype <= 1
        ? (user.usertype = userTypes[data.usertype])
        : null;
      data.username ? (user.username = data.username) : (data.username = null);
      if (data.password) {
        const hash = await hash_string(data.password);
        user.password = hash;
      }
      if (data.username !== null) {
        var userExists = await User.find({ username: data.username });
      } else {
        var userExists = [];
      }
      if (userExists.length !== 0) {
        if (userExists[0].id === userid) {
          user.save();
          if (
            0 <= data.usertype <= 1 &&
            userTypes[data.usertype] !== previousUserType
          ) {
            try {
              await UserTypeFieldEdit.create({
                profileid: userid,
                previousvalue: previousUserType,
                presentvalue: userTypes[data.usertype],
              });
            } catch (error) {
              res.json({ msg: "did not create log" });
            }
          }
          res.json(user);
        } else {
          res.json({ msg: "username already exists" });
        }
      } else {
        user.save();
        if (
          0 <= data.usertype <= 1 &&
          userTypes[data.usertype] !== previousUserType
        ) {
          try {
            await UserTypeFieldEdit.create({
              profileid: userid,
              previousvalue: previousUserType,
              presentvalue: userTypes[data.usertype],
            });
          } catch (error) {
            res.json({ msg: "did not create log" });
          }
        }
        res.json(user);
      }
    } catch (error) {
      res.json({ msg: "user not found" });
    }
  }
});

const deleteProfile = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const userid = req.user.id;

    try {
      const productsOrderedIfUser = await ProductsOrdered.find({
        userid: userid,
      });
      const productsOrderedIfAdmin = await ProductsOrdered.find({
        sellerid: userid,
      });

      if (productsOrderedIfUser || productsOrderedIfAdmin) {
        if (
          productsOrderedIfUser.length !== 0 ||
          productsOrderedIfAdmin.length !== 0
        ) {
          res.json({
            msg: "cannot delete your account due to exisiting orders",
          });
        } else {
          const productsIfUser = await Product.find({ seller: userid });
          if (productsIfUser && productsIfUser.length !== 0) {
            for (let i = 0; i < productsIfUser.length; i++) {
              productsIfUser[i].delete();
            }
          }
          const user = await User.findById(userid);
          user.delete();
          res.json(user);
        }
      } else {
        const productsIfUser = await Product.find({ seller: userid });
        if (productsIfUser && productsIfUser.length !== 0) {
          for (let i = 0; i < productsIfUser.length; i++) {
            productsIfUser[i].delete();
          }
        }
        const user = await User.findById(userid);
        user.delete();
        res.json(user);
      }
    } catch (error) {
      res.json({ msg: "user not found" });
    }
  } else {
    res.json({ msg: "user not found" });
  }
});

module.exports = { getProfile, editProfile, deleteProfile };
