const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.post("/", userController.store);
router.get("/:id", userController.userTweets);
router.patch("/follow", userController.userFollow);
// router.put("/:id", userController.controlerParaEditarUser);
// router.post("/:id/:tweetId/like", userController.tweetLikes);
// router.get("/:id/followers", userController.showFollowers);
// router.get("/:id/following", userController.showFollowing);
// router.use(isAuthenticated);
// router.get("/", userController.index);
router.get("/register", userController.showCreate);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
