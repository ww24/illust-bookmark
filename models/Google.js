/**
 * Google Model
 * models/Google.js
 */

module.exports = function (mongoose) {
  var GoogleSchema = new mongoose.Schema({
    // Google ID (email)
    email: {
      type: String,
      index: {unique: true},
      required: true
    },
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    }
  });

  return mongoose.model("Google", GoogleSchema);
};
