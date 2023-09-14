const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    cartCode: {
      type: String,
      unique: true,
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
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
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
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

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
