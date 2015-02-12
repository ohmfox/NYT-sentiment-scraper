var NYT = require("nyt");

var keys = {'article-search' : 'b62714c27c34f8d60f1a16ed1cd54f18:7:63335709'};

var nyt = new NYT(keys);



exports = module.exports = function scraper(query, callback) {
  query.page = 0;
  var articleData = [];
  var timer;

  function finished(arr) {
    callback(arr);
  }
  var i = 0, done = false;
  function loop(pages) {
    console.log("[%d\% finished]", Math.floor((i / pages) * 100));
    timer = setTimeout(function () {
      query.page = i;
      i++;
      nyt.article.search(query, function (data) {
        data = JSON.parse(data);
        articleData = articleData.concat(data.response.docs);
        if (i === pages && !done) {
          done = true;
          finished(articleData);
        } else if (!done) {
          loop(pages);
        }
      });
    }, 600);
  }
  nyt.article.search(query, function (data) {
    data = JSON.parse(data);
    var hits = data.response.meta.hits;
    var pages = Math.ceil(hits / 10) > 100 ? 100 : Math.ceil(hits / 10);
    loop(pages);
  });
};