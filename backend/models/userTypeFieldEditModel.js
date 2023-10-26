const mongoose = require("mongoose");

const userTypeFieldEditSchema = new mongoose.Schema({
  profileid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  previousvalue: {
    type: String,
    required: true,
  },
  presentvalue: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserTypeFieldEdit", userTypeFieldEditSchema);
