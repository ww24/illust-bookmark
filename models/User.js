/**
 * User Model
 * models/User.js
 */

module.exports = function (mongoose) {
  var UserSchema = new mongoose.Schema({
    // Twitter 認証 Token
    twitter: {
      type: mongoose.Schema.ObjectId,
      ref: "Twitter"
    },
    google: {
      type: mongoose.Schema.ObjectId,
      ref: "Google"
    },
    // Bookmark 一覧
    bookmarks: [{
      type: mongoose.Schema.ObjectId,
      ref: "Bookmark"
    }]
  });

  return mongoose.model("User", UserSchema);
};
