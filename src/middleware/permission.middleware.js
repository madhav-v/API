const checkPermission = (role) => {
  return (req, res, next) => {
    let user = req.authUser;
    if (typeof role === "string" && user.role === role) {
      next();
    } else if (Array.isArray(role) && role.includes(user.role)) {
      next();
    } else {
      next({
        status: 403,
        msg: "You do not have previlege to access this request",
      });
    }
  };
};

const isAdmin = (req, res, next) => {
  let user = req.authUser;
  if (user.role === "admin") {
    next();
  } else {
    next({
      status: 403,
      msg: "You do not have previlege to access this request",
    });
  }
};
const isSeller = (req, res, next) => {
  let user = req.authUser;
  if (user.role === "seller") {
    next();
  } else {
    next({
      status: 403,
      msg: "You do not have previlege to access this request",
    });
  }
};

const isCustomer = (req, res, next) => {
  let user = req.authUser;
  if (user.role === "customer") {
    next();
  } else {
    next({
      status: 403,
      msg: "You do not have previlege to access this request",
    });
  }
};

const isAdminOrSeller = (req, res, next) => {
  let user = req.authUser;
  if (user.role === "admin" || user.role === "seller") {
    next();
  } else {
    next({
      status: 403,
      msg: "You do not have previlege to access this request",
    });
  }
};

module.exports = {
  isAdmin,
  isSeller,
  isCustomer,
  isAdminOrSeller,
  checkPermission,
};
