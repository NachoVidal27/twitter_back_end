const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
// const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/", tweetController.show);
router.post("/", tweetController.create);
// router.get("/:id", tweetController.showTweetById);
router.delete("/:id", tweetController.destroy);
router.patch("/:id", tweetController.tweetLikes);

module.exports = router;
