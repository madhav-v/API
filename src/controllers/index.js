const BannerController = require("./banner.controller");
const bannerCtrl = new BannerController();

const BrandController = require("./brand.controller");
const brandCtrl = new BrandController();

const CategoryController = require("./category.controller");
const categoryCtrl = new CategoryController();

const ProductController = require("./product.controller");
const productCtrl = new ProductController();

const CartController = require("./cart.controller");
const cartCtrl = new CartController();

module.exports = {
  bannerCtrl,
  brandCtrl,
  categoryCtrl,
  productCtrl,
  cartCtrl,
};
