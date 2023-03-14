const User = require("../models/User");
const Tweet = require("../models/Tweet");

async function show(req, res) {
  const tweets = await Tweet.find();
  return res.json(tweets);
}

async function create(req, res) {
  const loggedUser = "641091e2fd5a538f7ac71360";
  const user = await User.findById(loggedUser);
  const tweet = new Tweet({
    userId: user,
    content: req.body.tweet,
  });
  user.tweets.push(tweet);
  const result = await user.save();
  await Tweet.create(tweet);

  return res.json("twt creado");
}

async function destroy(req, res) {
  await Tweet.findByIdAndDelete(req.params.id);
  return res.json("twt eliminado");
}

async function tweetLikes(req, res) {
  const userId = "641091e2fd5a538f7ac71360";
  const tweet = await Tweet.findById(req.params.id);

  if (tweet.likes.find((id) => id.toString() === userId.toString())) {
    await tweet.updateOne({ $pull: { likes: userId } });
  } else {
    await tweet.updateOne({ $addToSet: { likes: userId } });
  }

  return res.json("twt likeado");
}

module.exports = {
  show,
  create,
  destroy,
  tweetLikes,
};
