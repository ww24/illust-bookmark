/**
 * format Date
 * libs/formatDate.js
 */

function zeroPadding(num) {
  return ("0" + num).slice(-2);
}

module.exports = function (date) {
  date = date instanceof Date ? date : new Date(date);

  var dateString = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map(zeroPadding).join("/");

  var timeString = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].map(zeroPadding).join(":");

  return dateString + " " + timeString;
};
