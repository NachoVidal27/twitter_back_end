const User = require("../models/User");
const Tweet = require("../models/Tweet");

async function show(req, res) {
  const tweets = await Tweet.find();
  return res.json(tweets);
}

async function create(req, res) {
  const user = await User.findOne({ _id: req.user });
  const tweet = new Tweet({
    userId: user,
    content: req.body.tweet,
  });
  user.tweets.push(tweet);
  const result = await user.save();
  await Tweet.create(tweet);

  return res.json("/home");
}

async function destroy(req, res) {
  await Tweet.findByIdAndDelete(req.params.id);
  return res.json(`/user/${req.user.id}`);
}

async function tweetLikes(req, res) {
  const userId = req.user._id;
  const tweet = await Tweet.findById(req.params.id);

  if (tweet.likes.find((id) => id.toString() === userId.toString())) {
    await tweet.updateOne({ $pull: { likes: userId } });
  } else {
    await tweet.updateOne({ $addToSet: { likes: userId } });
  }

  return res.json(req.get(`referer`));
}

module.exports = {
  show,
  create,
  destroy,
  tweetLikes,
};
