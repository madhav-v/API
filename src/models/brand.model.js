const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const BrandModel = mongoose.model("Brand", BrandSchema);
module.exports = BrandModel;
