const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    subTotal: {
      type: Number,
      required: true,
    },
    discount: Number,
    total: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "verified"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
