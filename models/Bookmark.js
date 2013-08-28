/**
 * Bookmark Model
 * models/Bookmark.js
 */

var lib = require("../libs");

module.exports = function (mongoose) {
  var BookmarkSchema = new mongoose.Schema({
    // パーマリンク用
    id: {
      type: String,
      index: {unique: true},
      required: true
    },
    // 拡張子
    ext: {
      type: String,
      required: true,
      validate: [function (value) {
        var valid = new lib.Validator();
        valid.check(value).regex(/^\.(jpg|png|gif)$/);
        return valid.getErrors().length === 0;
      }, "不正な拡張子です"]
    },
    // ブックマークのタイトル
    title: {
      type: String,
      required: true,
      validate: [function (value) {
        var valid = new lib.Validator();
        valid.check(value).notEmpty();
        valid.getErrors().length === 0;
      }, "不正な title です"]
    },
    // ブックマーク先の URL
    url: {
      type: String,
      required: true,
      validate: [function (value) {
        var valid = new lib.Validator();
        valid.check(value).isUrl();
        return valid.getErrors().length === 0;
      }, "不正な URL です"]
    },
    // 元画像の URL
    imageUrl: {
      type: String,
      required: true,
      validate: [function (value) {
        var valid = new lib.Validator();
        valid.check(value).isUrl();
        return valid.getErrors().length === 0;
      }, "不正な URL です"]
    },
    // ブックマークのタグ
    tags: [{
      type: mongoose.Schema.ObjectId,
      ref: "Tag"
    }],
    // ブックマークへのコメント   
    comments: [{
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    }],
    // 作成日時
    timestamp: {
      type: Date,
      default: Date.now,
      required: true
    }
  });

  return mongoose.model("Bookmark", BookmarkSchema);
};
