/**
 * User Model
 * models/User.js
 */

module.exports = function (mongoose) {
  var UserSchema = new mongoose.Schema({
    // ユーザ ID (email)
    email: {
      type: String,
      index: {unique: true}
    },
    // ユーザ PW のハッシュ
    pw: {
      type: String
    },
    // Twitter 認証 Token
    twitter: {
      type: mongoose.Schema.ObjectId,
      ref: "Twitter"
    }
  });

  return mongoose.model("User", UserSchema);
};
