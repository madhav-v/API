const CategoryService = require("../services/category.service");
const slugify = require("slugify");

class CategoryController {
  _svc;

  constructor() {
    this._svc = new CategoryService();
  }

  listAllCategorys = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getAllCategorys(paging);
      res.json({
        result: data,
        status: true,
        msg: "Category Data fetched",
        meta: paging,
      });
    } catch (exception) {
      next(exception);
    }
  };

  storeCategory = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      let validated = await this._svc.categoryValidate(data);
      validated.slug = slugify(validated.name, { lower: true });
      let response = await this._svc.createCategory(validated);
      res.json({
        result: response,
        msg: "Category Created successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      let data = req.body;
      let category = await this._svc.getCategoryById(req.params.id);
      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = category.image;
      }

      let validated = await this._svc.categoryValidate(data);
      let response = await this._svc.updateCategory(validated, req.params.id);
      res.json({
        result: response,
        msg: "Category Updated successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteCategory = async (req, res, next) => {
    try {
      let category = await this._svc.getCategoryById(req.params.id);
      let del = await this._svc.deleteCategoryById(req.params.id);
      res.json({
        result: del,
        msg: "Category deleted successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  getCategoryForHomePage = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
      };
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(filter),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getCategoryByFilter(filter, paging);
      res.json({
        result: data,
        msg: "Category Data",
        status: true,
        meta: paging,
      });
    } catch (except) {
      next(except);
    }
  };
}
module.exports = CategoryController;
