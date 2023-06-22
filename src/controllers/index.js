const BannerController = require("./banner.controller");
const bannerCtrl = new BannerController();

const BrandController = require("./brand.controller");
const brandCtrl = new BrandController();

const CategoryController = require("./category.controller");
const categoryCtrl = new CategoryController();

const ProductController = require("./product.controller");
const productCtrl = new ProductController();

module.exports = {
  bannerCtrl,
  brandCtrl,
  categoryCtrl,
  productCtrl,
};
