var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  var query = req.body.query;

  var options = {
  url: 'https://api.github.com/search/repositories?q=user:jlb1982',
  headers: {
    'User-Agent': 'jlb1982'
  }
};

  request(options, function (err, resp, body) {
      console.log(body);
      // if (!err && res.statusCode == 200) {
      //   var info = JSON.parse(body)
      //   console.log(res);
      // }
      //res.end();
  })

  res.end();
});

app.get('/repos', function (req, res) {
  console.log('get');
  res.end();
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});