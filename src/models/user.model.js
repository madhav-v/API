const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  houseNo: Number,
  streetName: String,
  address: String,
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["actice", "inactive"],
      default: "inactive",
    },
    activationToken: {
      type: String,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    address: {
      billingAddress: AddressSchema,
      shippingAddress: AddressSchema,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
