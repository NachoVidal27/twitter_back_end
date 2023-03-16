const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

faker.locale = "es";

module.exports = async () => {
  const tweets = [];
  const totalTweets = 30;
  for (let i = 0; i < totalTweets; i++) {
    const tweet = new Tweet({
      content: faker.lorem.sentence(40),
    });
    tweets.push(tweet);
  }
  for (const tweet of tweets) {
    const randomNumber = faker.datatype.number({ min: 1, max: 10 });
    const randomUser = await User.findOne().skip(randomNumber);
    tweet.user = randomUser;
    randomUser.tweets.push(tweet);
    await randomUser.save();
  }
  await Tweet.insertMany(tweets);

  console.log("[Database] Se corrió el seeder de Tweets.");
};
