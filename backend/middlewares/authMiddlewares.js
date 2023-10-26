const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  if (req.headers.auth && req.headers.auth.startsWith("Bearer")) {
    let authToken = req.headers.auth.split(" ")[1];
    try {
      var decodedToken = jwt.verify(authToken, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ msg: "token not correct" });
    }

    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
  } else {
    res.status(403).json({ msg: "no auth" });
  }
};

module.exports = { auth };
