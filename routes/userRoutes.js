const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.post("/", userController.store);
router.post("/tokens", userController.getToken);
router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));
router.get("/:id", userController.userTweets);
router.get("/show/:id", userController.show);
router.post("/follow", userController.userFollow);

module.exports = router;
