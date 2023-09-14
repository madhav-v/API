const app = require("express").Router();

const authRoutes = require("./auth.routes");
const bannerRoutes = require("./banner.routes");
const brandRoutes = require("./brand.routes");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes")

app.use("/auth", authRoutes);
app.use("/banner", bannerRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

module.exports = app;
