
var express = require('express');
var fs = require('fs');
var app     = express();

var scraper = require("./scraper");
var sentiment = require("./sentiment");

app.get('/get/:query/:time', function(req, res){
  var time = req.params.time.split("-");
  var q = req.params.query;
  var query = {
    q: q,
    begin_date:time[0],
    end_date:time[1]
  };
  console.log(query);
  scraper(query, function(arr) {
    sentiment(arr, function(data) {
      res.json(data);
      fs.writeFile("output+"+q+"+"+time[0]+"-"+time[1]+".json", JSON.stringify(data, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
      });
    });
  });
});

app.get('/getStored/:query/:time', function(req, res){
  var time = req.params.time.split("-");
  var q = req.params.query;
  fs.readFile("output+"+q+"+"+time[0]+"-"+time[1]+".json", function(err, data){
    if(!err) {
      res.json(JSON.parse(data));
    } else {
      res.json({error: err});
    }
  });
});

app.get('/display', function(req, res) {
  res.sendFile("display.html", {root: "."});
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;