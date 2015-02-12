var sentiment = require("sentiment");
var sentimentArr = [];

exports = module.exports = function sentimentParent(data, callback) {
  var count = data.length;
  for (var i = 0; i < count; i++) {
    if(data[i].lead_paragraph===null) continue;
    var curr = sentiment(data[i].lead_paragraph);
    sentimentArr.push([curr, data[i]]);
  }
  callback(sentimentArr);
}