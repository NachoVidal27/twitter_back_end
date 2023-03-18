const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.post("/", userController.store);
router.post("/tokens", userController.getToken);
router.get("/:id", userController.show);
router.post("/follow", userController.userFollow);

module.exports = router;
