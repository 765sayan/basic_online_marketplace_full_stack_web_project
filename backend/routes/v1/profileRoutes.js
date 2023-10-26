const express = require("express");
const {
  getProfile,
  editProfile,
  deleteProfile,
} = require("../../controllers/profileControllers");
const router = express.Router();

const { auth } = require("../../middlewares/authMiddlewares");
const {
  userUserType,
  adminUserType,
} = require("../../middlewares/userTypeMiddleware");

// router.get("/user", auth, userUserType, getProfile);
// router.put("/user", auth, userUserType, editProfile);

// router.delete("/user", auth, userUserType, deleteProfile);

// router.get("/admin", auth, adminUserType, getProfile);
// router.put("/admin", auth, adminUserType, editProfile);
// router.delete("/admin", auth, adminUserType, deleteProfile);

router.get("", auth, getProfile);
router.put("", auth, editProfile);
router.delete("", auth, deleteProfile);

module.exports = router;
