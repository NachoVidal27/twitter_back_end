const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/home", isAuthenticated, pagesController.showHome);
router.get("/home/like", isAuthenticated, pagesController.showLike);
router.get("/", pagesController.showLogin);
router.get("/register", pagesController.showRegister);

// router.get("/profile", isAuthenticated, pagesController.showUserProfile);
//router.get("/home"), pagesController.

/* router.get("*", function (req, res) {
  res.status(404).render("pages/404");
}); */

module.exports = router;
