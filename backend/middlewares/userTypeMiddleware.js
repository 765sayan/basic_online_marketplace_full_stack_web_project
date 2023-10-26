const adminUserType = async (req, res, next) => {
  if (req.user && req.user.usertype === "admin") {
    next();
  } else {
    return res.json({ msg: "not admin" });
  }
};

const userUserType = async (req, res, next) => {
  if (req.user && req.user.usertype === "user") {
    next();
  } else {
    return res.json({ msg: "not user" });
  }
};

module.exports = { adminUserType, userUserType };
