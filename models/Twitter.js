/**
 * Twitter Model
 * models/Twitter.js
 */

module.exports = function (mongoose) {
  var TwitterSchema = new mongoose.Schema({
    // Twitter ID
    id: {
      type: String,
      index: {unique: true},
      required: true
    },
    // OAuth Token
    oauth_access_token: {
      type: String
    },
    // OAuth Token Secret
    oauth_access_token_secret: {
      type: String
    }
  });

  return mongoose.model("Twitter", TwitterSchema);
};
