/**
 * generate tagid
 * libs/tagid.js
 */

var crypto = require("crypto");

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+";
    charLength = chars.length;

function encoder (buf) {
  var i,
      l = buf.length,
      tagid = [];

  for (var i = 0; i < l; i++)
    tagid[i] = chars[buf.readUInt8(i) % charLength];

  return tagid.join("");
};

/* check   : 重複 check 用関数
 * callback: 結果返却用関数
 */
module.exports = function generateTagId(check, callback) {
  crypto.randomBytes(6, function (err, buf) {
    if (err)
      throw error

    var tagid = encoder(buf);
    check(tagid, function (status) {
      if (status)
        callback(tagid);
      else
        generateTagId(check, callback);
    });
  });
};
