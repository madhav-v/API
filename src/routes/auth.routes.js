const app = require("express").Router();
const authCheck = require("../middleware/auth.middleware");
const uploader = require("../middleware/uploader.middleware");

const authCtrl = require("../controllers/auth.controller");
const { checkPermission } = require("../middleware/permission.middleware");
// const { isAdmin } = require("../middleware/permission.middleware");

app.post("/login", authCtrl.login);

const uploadPath = (req, res, next) => {
  req.uploadPath = "./public/user";
  next();
};
app.post("/register", uploadPath, uploader.single("image"), authCtrl.register);

app.post("/activate/:token", authCtrl.activateUser);
app.post("/forget-password", authCtrl.forgetPassword);
app.post("/password-reset", authCtrl.resetPassword);
app.get("/me", authCheck, authCtrl.getLoggedInUser);

app.get("/refresh-token", authCheck, authCtrl.refreshToken);

module.exports = app;
