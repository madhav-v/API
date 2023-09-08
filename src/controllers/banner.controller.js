const BannerService = require("../services/banner.service");

class BannerController {
  _svc;

  constructor() {
    this._svc = new BannerService();
  }

  listAllBanners = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getAllBanners(paging);
      res.json({
        result: data,
        status: true,
        msg: "Banner Data fetched",
        meta: paging,
      });
    } catch (exception) {
      next(exception);
    }
  };

  storeBanner = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      let validated = await this._svc.bannerValidate(data);
      let response = await this._svc.createBanner(validated);
      res.json({
        result: response,
        msg: "Banner Created successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBanner = async (req, res, next) => {
    try {
      let data = req.body;
      let banner = await this._svc.getBannerById(req.params.id);
      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = banner.image;
      }

      let validated = await this._svc.bannerValidate(data);
      let response = await this._svc.updateBanner(validated, req.params.id);
      res.json({
        result: response,
        msg: "Banner Updated successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBanner = async (req, res, next) => {
    try {
      let banner = await this._svc.getBannerById(req.params.id);
      let del = await this._svc.deleteBannerById(req.params.id);
      res.json({
        result: del,
        msg: "Banner deleted successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  getBannerForHomePage = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
        startDate: { $lte: Date.now() },
        endDate: { $gte: Date.now() },
      };
      let data = await this._svc.getBannerByFilter(filter);
      res.json({
        result: data,
        msg: "Banner Data",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
  getBannerById = async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = await this._svc.getBannerById(id);
      res.json({
        result: data,
        msg: "Banner Data",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}
module.exports = BannerController;
