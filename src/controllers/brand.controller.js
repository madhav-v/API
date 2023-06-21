const BrandService = require("../services/brand.service");
const slugify = require("slugify");

class BrandController {
  _svc;

  constructor() {
    this._svc = new BrandService();
  }

  listAllBrands = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getAllBrands(paging);
      res.json({
        result: data,
        status: true,
        msg: "Brand Data fetched",
        meta: paging,
      });
    } catch (exception) {
      next(exception);
    }
  };

  storeBrand = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      let validated = await this._svc.brandValidate(data);
      validated.slug = slugify(validated.name, { lower: true });
      let response = await this._svc.createBrand(validated);
      res.json({
        result: response,
        msg: "Brand Created successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBrand = async (req, res, next) => {
    try {
      let data = req.body;
      let brand = await this._svc.getBrandById(req.params.id);
      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = brand.image;
      }

      let validated = await this._svc.brandValidate(data);
      let response = await this._svc.updateBrand(validated, req.params.id);
      res.json({
        result: response,
        msg: "Brand Updated successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBrand = async (req, res, next) => {
    try {
      let brand = await this._svc.getBrandById(req.params.id);
      let del = await this._svc.deleteBrandById(req.params.id);
      res.json({
        result: del,
        msg: "Brand deleted successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  getBrandForHomePage = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
      };
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(filter),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getBrandByFilter(filter, paging);
      res.json({
        result: data,
        msg: "Brand Data",
        status: true,
        meta: paging,
      });
    } catch (except) {
      next(except);
    }
  };
}
module.exports = BrandController;
