/**
 * Bookmark Model
 * models/Bookmark.js
 */

module.exports = function (mongoose) {
  var BookmarkSchema = new mongoose.Schema({
    // パーマリンク用
    id: {
      type: String,
      index: {unique: true},
      required: true
    },
    // ブックマークのタイトル
    title: {
      type: String,
      required: true
    },
    // ブックマーク先の URL
    url: {
      type: String,
      required: true
    },
    // 元画像の URL
    imageUrl: {
      type: String,
      required: true
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
      required: true
    }
  });

  return mongoose.model("Bookmark", BookmarkSchema);
};
