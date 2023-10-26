const jwt = require("jsonwebtoken");

const generateToken = (value) => {
  const token = jwt.sign(value, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = { generateToken };
