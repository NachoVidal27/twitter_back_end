// const Tweet = require("../models/Tweet");
// const User = require("../models/User");

// async function showHome(req, res) {
//   const allTweets = await Tweet.find({ userId: { $in: req.user.following } })
//     .populate("userId")
//     .sort({ createdAt: "desc" });

//   return res.json("pages/home", { allTweets });
// }

// // async function showLike(req, res) {
// //   const likes = [];
// //   for (let i = 0; i < likes.length; i++) {
// //     if (likes[i] === req.session.passport.user) {
// //       likes.slice(i);
// //     } else {
// //       likes.push(req.session.passport.user);
// //     }
// //   }
// //   res.json("/home");
// // }

// async function showUserProfile(req, res) {
//   const allTweets = await Tweet.find().populate("userId");
//   const user = await User.find({ id: req.user });
//   return res.json("pages/profile", { allTweets, user });
// }

// async function showLogin(req, res) {
//   res.json("pages/login");
// }

// async function showRegister(req, res) {
//   res.json("pages/register");
// }

// async function show404(req, res) {
//   res.status(404).json("pages/404");
// }

// module.exports = {
//   showHome,
//   showLike,
//   showUserProfile,
//   showLogin,
//   showRegister,
// };
