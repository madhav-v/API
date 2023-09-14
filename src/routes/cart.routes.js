const router = require("express").Router();
const { cartCtrl } = require("../controllers");
const authCheck = require("../middleware/auth.middleware");
const {checkPermission} = require("../middleware/permission.middleware")

router.route("/").post(authCheck, cartCtrl.addToCart);
router.get("/list-all", authCheck, checkPermission("admin"),cartCtrl.listAll)
router.post("/detail", authCheck, cartCtrl.getCartDetail);
router.post("/setCart", authCheck, cartCtrl.placeOrder);

module.exports = router;
