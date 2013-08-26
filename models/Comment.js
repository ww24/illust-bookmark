/**
 * Comment Model
 * models/Comment.js
 */

module.exports = function (mongoose) {
  var CommentSchema = new mongoose.Schema({
    // コメント内容
    message: {
      type: String,
      required: true
    },
    // コメント作成者
    from: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    // 作成日時  
    timestamp: {
      type: Date,
      required: true
    }
  });

  return mongoose.model("Comment", CommentSchema);
};
