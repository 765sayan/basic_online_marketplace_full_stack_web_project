const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const {
  hash_string,
  compare_hash_with_string,
} = require("../utils/encryptString");
const { generateToken } = require("../utils/generateToken");
const { userTypes } = require("../utils/importantVariables");

const login = asyncHandler(async (req, res, next) => {
  if (req.body) {
    var data = req.body;
    var username = data.username;
    var password = data.password;

    try {
      const user = await User.find({ username });
      if (user.length) {
        let comparison_status_bool = await compare_hash_with_string(
          password,
          user[0].password
        );
        if (comparison_status_bool) {
          let response = {
            id: user[0].id,
            username: user[0].username,
            usertype: user[0].usertype,
          };
          res.json({ ...response, token: generateToken({ id: user[0].id }) });
        } else {
          res.status(400).json({ msg: "password incorrect" });
        }
      } else {
        res.status(400).json({ msg: "Invalid Credentials" });
      }
    } catch (error) {
      return res.json({ msg: "Error" });
    }
  }
});

const register = asyncHandler(async (req, res, next) => {
  if (req.body) {
    var data = req.body;
    console.log(data);
    var username = data.username;
    var password = data.password;
    var name = data.name;
    var usertype = data.usertype;
    const hash = await hash_string(password);

    try {
      const findUser = await User.find({ username });
      if (findUser.length === 0) {
        const user = await User.create({
          username: username,
          password: hash,
          name: name,
          usertype: userTypes[usertype],
        });

        res.status(200).json({ user: user.id, usertype: user.usertype });
      } else {
        res.status(500).json({ msg: "Username already exists" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Error" });
    }
  }
});

module.exports = { register, login };
