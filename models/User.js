const { mongoose, Schema } = require("../db");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    profileImg: String,
    bio: String,
    password: String,
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
);

//------<>------- Alternativo con Virtuals
// userSchema.virtual(`idString`).get(function () {
//   return this._id.toString();
// });
//------<>------- Alternativo con Virtuals

const User = mongoose.model("User", userSchema);

module.exports = User;
