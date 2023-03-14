const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.post("/", userController.store);
router.get("/:id", userController.userTweets);
router.post("/follow", userController.userFollow);
router.get("/register", userController.showCreate);
router.post("/token", userController.getToken);

module.exports = router;
