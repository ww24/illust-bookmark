/**
 * Tag Model
 * models/Tag.js
 */

module.exports = function (mongoose) {
  var TagSchema = new mongoose.Schema({
    // タグ名
    name: {
      type: String,
      index: {unique: true},
      required: true
    }
  });

  return mongoose.model("Tag", TagSchema);
};
