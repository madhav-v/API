const mongoose = require("mongoose");
const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    link: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const BannerModel = mongoose.model("Banner", BannerSchema);
module.exports = BannerModel;
