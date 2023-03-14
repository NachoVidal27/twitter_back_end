const User = require("../models/User");
const bcrypt = require("bcryptjs");
async function index(req, res) {}
const Tweet = require("../models/Tweet");

async function showCreate(req, res) {
  return res.json("pages/register");
}

async function store(req, res) {
  newUser = req.body;
  console.log(newUser);
  const passwordHasheado = await bcrypt.hash(newUser.password, 10);
  const created = await User.create({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    email: newUser.email,
    username: newUser.username,
    image: newUser.image,
    password: passwordHasheado,
  });

  return res.json(created);
}

async function userTweets(req, res) {
  const logedUser = req.user;
  const user = await User.findOne({ _id: req.params.id }).populate("tweets", null, null, {
    sort: { createdAt: "desc" },
  });
  return res.json(user);
}

async function userFollow(req, res) {
  const userId = req.user._id;
  const user = await User.findById(req.params.id);

  if (user.followers.find((id) => id.toString() === userId.toString())) {
    await user.updateOne({ $pull: { followers: userId } });
    await req.user.updateOne({ $pull: { following: user._id } });
  } else {
    await user.updateOne({ $addToSet: { followers: userId } });
    await req.user.updateOne({ $addToSet: { following: user._id } });
  }

  return res.json(req.get(`referer`));
}

module.exports = {
  index,
  store,
  showCreate,
  userTweets,
  userFollow,
};
