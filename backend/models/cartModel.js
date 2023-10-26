const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sellerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
