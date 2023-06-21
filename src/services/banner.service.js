const BannerModel = require("../models/banner.model");
const Joi = require("joi");

class BannerService {
  bannerValidate = async (data) => {
    try {
      let schema = Joi.object({
        title: Joi.string().min(3).required(),
        link: Joi.string().allow(null, ""),
        startDate: Joi.date(),
        endDate: Joi.date().greater(Joi.ref("startDate")),
        image: Joi.string().required(),
        status: Joi.string().valid("active", "inactive").default("inactive"),
      });
      let response = schema.validate(data);
      if (response.error) {
        let msg = response.error.details[0].message;
        throw { status: 400, msg: msg };
      }
      return response.value;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }
  };

  getAllBanners = async ({ perPage = 10, currentPage = 1 }) => {
    try {
      let skip = (currentPage - 1) * perPage;

      let data = await BannerModel.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(perPage);
      return data;
    } catch (exception) {
      console.log(exception);
      throw { status: 500, msg: "Query execution failed." };
    }
  };

  getAllCount = async () => {
    return await BannerModel.count();
  };

  createBanner = async (data) => {
    try {
      let banner = new BannerModel(data);
      return await banner.save();
    } catch (exception) {
      console.log(exception);
      throw {
        status: 500,
        msg: "DB Query failed",
      };
    }
  };

  updateBanner = async (data, id) => {
    try {
      // findByIdAndUpdate => return => before update boject
      let response = await BannerModel.findByIdAndUpdate(id, { $set: data });
      return response;
    } catch (except) {
      throw except;
    }
  };

  getBannerById = async (id) => {
    try {
      let banner = await BannerModel.findById(id);
      if (banner) {
        return banner;
      } else {
        throw { status: 404, msg: "Banner does not exists" };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  deleteBannerById = async (id) => {
    try {
      let delResponse = await BannerModel.findByIdAndDelete(id);
      if (delResponse) {
        return delResponse;
      } else {
        throw {
          status: 404,
          msg: "Banner has been already deleted or does not exists",
        };
      }
    } catch (except) {
      throw except;
    }
  };

  getBannerByFilter = async (filter) => {
    try {
      let response = await BannerModel.find(filter).sort({ _id: -1 }).limit(10);
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

module.exports = BannerService;
