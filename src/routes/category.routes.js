const router = require("express").Router();
const HttpResponse = require("../config/http-response-codes");
const authCheck = require("../middleware/auth.middleware");
const { checkPermission } = require("../middleware/permission.middleware");
const { categoryCtrl } = require("../controllers");
const uploader = require("../middleware/uploader.middleware");

const uploadPath = (req, res, next) => {
  req.uploadPath = "./public/category/";
  next();
};

router.get("/:slug/detail", categoryCtrl.getDetailOfCategory);

router
  .route("/")
  .get(authCheck, checkPermission("admin"), categoryCtrl.listAllCategorys)
  .post(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    categoryCtrl.storeCategory
  );

router
  .route("/:id")
  .put(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    categoryCtrl.updateCategory
  )
  .get(authCheck, checkPermission("admin"), categoryCtrl.getCategoryById)
  .delete(authCheck, checkPermission("admin"), categoryCtrl.deleteCategory);

router.get("/list/home", categoryCtrl.getCategoryForHomePage);

module.exports = router;
