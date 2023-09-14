const CartModel = require("../models/cart.model");

class CartService {
  addToCart = (data) => {
    try {
      let cart = new CartModel(data);
      return cart.save();
    } catch (exception) {
      throw exception;
    }
  };
}

module.exports = CartService;
