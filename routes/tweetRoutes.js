const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));
router.get("/", tweetController.show);
router.post("/", tweetController.create);
router.delete("/:id", tweetController.destroy);
router.post("/:id", tweetController.tweetLikes);

module.exports = router;
