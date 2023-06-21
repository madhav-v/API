const router = require("express").Router();
// const app = express.Router();
const HttpResponse = require("../config/http-response-codes");
const authCheck = require("../middleware/auth.middleware");
const { checkPermission } = require("../middleware/permission.middleware");
const { bannerCtrl } = require("../controllers");
const uploader = require("../middleware/uploader.middleware");

const uploadPath = (req, res, next) => {
  req.uploadPath = "./public/banner/";
  next();
};

router
  .route("/")
  .get(authCheck, checkPermission("admin"), bannerCtrl.listAllBanners)
  .post(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    bannerCtrl.storeBanner
  );

router
  .route("/:id")
  .put(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    bannerCtrl.updateBanner
  )
  .delete(authCheck, checkPermission("admin"), bannerCtrl.deleteBanner);

router.get("/list/home", bannerCtrl.getBannerForHomePage);

module.exports = router;
