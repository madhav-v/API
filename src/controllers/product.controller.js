const ProductService = require("../services/product.service");
const slugify = require("slugify");

class ProductController {
  _svc;

  constructor() {
    this._svc = new ProductService();
  }

  listAllProducts = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getAllProducts(paging);
      res.json({
        result: data,
        status: true,
        msg: "Product Data fetched",
        meta: paging,
      });
    } catch (exception) {
      next(exception);
    }
  };

  storeProduct = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        data.images = req.files.map((item) => {
          return item.filename;
        });
      }

      if (typeof data.attributes === "string") {
        data.attributes = JSON.parse(data.attributes);
      }

      let validated = await this._svc.productValidate(data);
      validated.slug = slugify(validated.name, { lower: true });
      if (validated.categories === "null") {
        validated.categories = null;
      } else {
        validated.categories = validated.categories.split(",");
      }

      if (validated.brand === "null") {
        validated.brand = null;
      }

      if (validated.sellerId === "null") {
        validated.sellerId = null;
      }

      validated.afterDiscount =
        validated.price - (validated.price * validated.discount) / 100;
      let response = await this._svc.createProduct(validated);
      res.json({
        result: response,
        msg: "Product Created successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      let data = req.body;
      let product = await this._svc.getProductById(req.params.id);
      let images = [];
      if (req.files) {
        images = req.files.map((item) => {
          return item.filename;
        });
      }

      data.images = [...product.images, ...images];

      if (typeof data.attributes === "string") {
        data.attributes = JSON.parse(data.attributes);
      }

      let validated = await this._svc.productValidate(data);

      if (validated.categories === "null") {
        validated.categories = null;
      } else {
        validated.categories = validated.categories.split(",");
      }

      if (validated.brand === "null") {
        validated.brand = null;
      }

      if (validated.sellerId === "null") {
        validated.sellerId = null;
      }

      validated.afterDiscount =
        validated.price - (validated.price * validated.discount) / 100;

      let response = await this._svc.updateProduct(validated, req.params.id);
      res.json({
        result: response,
        msg: "Product Updated successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      let product = await this._svc.getProductById(req.params.id);
      let del = await this._svc.deleteProductById(req.params.id);
      res.json({
        result: del,
        msg: "Product deleted successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  getProductForHomePage = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
      };
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(filter),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getProductByFilter(filter, paging);
      res.json({
        result: data,
        msg: "Product Data",
        status: true,
        meta: paging,
      });
    } catch (except) {
      next(except);
    }
  };
  getProductById = async (req, res, next) => {
    try {
      let product = await this._svc.getProductById(req.params.id);

      res.json({
        result: product,
        msg: "Product fetched successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
}
module.exports = ProductController;
