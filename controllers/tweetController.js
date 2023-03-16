const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { expressjwt: checkJwt } = require("express-jwt");

async function index(req, res) {
  const tweets = await Tweet.find();
  return res.json(tweets);
}

async function create(req, res) {
  checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });
  const user = await User.findById(req.auth.id);
  console.log(user);
  const tweet = new Tweet({
    userId: req.auth.id,
    content: req.body.tweet,
  });
  user.tweets.push(tweet);
  const result = await user.save();
  await Tweet.create(tweet);
  return res.json("twt creado");
}

async function destroy(req, res) {
  checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });
  await Tweet.findByIdAndDelete(req.params.id);
  return res.json("twt eliminado");
}

async function tweetLikes(req, res) {
  checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });
  const userId = req.auth.id;
  const tweet = await Tweet.findById(req.params.id);

  if (tweet.likes.find((id) => id.toString() === userId.toString())) {
    await tweet.updateOne({ $pull: { likes: userId } });
  } else {
    await tweet.updateOne({ $addToSet: { likes: userId } });
  }

  return res.json("twt likeado");
}

module.exports = {
  index,
  create,
  destroy,
  tweetLikes,
};
