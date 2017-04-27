var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  var query = req.data;
  console.log('test: ', req.body.query)
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