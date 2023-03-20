const User = require("../models/User");
const bcrypt = require("bcryptjs");
async function index(req, res) {}
const Tweet = require("../models/Tweet");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

async function store(req, res) {
  newUser = req.body;
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const { firstname, lastname, email, username, password } = fields;
  });

  const passwordHasheado = await bcrypt.hash(newUser.password, 10);
  const created = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    image: files.image.newFilename,
    password: passwordHasheado,
  });
  await created.save();
  return res.json(created);
}

async function show(req, res) {
  console.log(req.auth);
  const user = await User.findById(req.params.id).populate("tweets");
  return res.json(user);
}
// async function show(req, res) {
//   const user = await User.findById(req.auth.id);
//   console.log(user);
//   const tweets = await Tweet.find({ userId: user.id }).populate("tweets");
//   //   .sort({ createdAt: "desc" })
//   //   .limit(20);
//   console.log(tweets);
//   return res.json(user);
// }

async function userTweets(req, res) {
  const logedUser = await User.findById(req.params.id);
  const user = await Tweet.find({ user: logedUser }).populate("tweets", null, null, {
    sort: { createdAt: "desc" },
  });
  return res.json(user);
}

async function getToken(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send("Error en las credenciaes ingresadas", 401);
  }
  const checkHash = await bcrypt.compare(req.body.password, user.password);
  if (!checkHash) {
    return res.send("Error en las credenciaes ingresadas", 401);
  }
  return res.json({
    token: jwt.sign({ id: user.id }, process.env.SESSION_SECRET),
    id: user.id,
  });
}

async function userFollow(req, res) {
  const userId = req.auth.id;
  const user = await User.findById(req.params.id);

  if (user.followers.includes(userId)) {
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
  userTweets,
  userFollow,
  getToken,
  show,
};
