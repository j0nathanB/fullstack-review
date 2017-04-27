var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var Repo = require('../database/index.js');
var Promise = require('bluebird')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  var query = JSON.stringify(req.body.query);

  var reposFromAPI = [];

  var options = {
    url: 'https://api.github.com/search/repositories?q=user:' + query,
    headers: {
      'User-Agent': 'jlb1982'
    }
  };

  request(options, function (err, resp, body) {
    if (!err && resp.statusCode == 200) {  
      var parsedBody = JSON.parse(body);
      
      reposFromAPI = parsedBody.items.map( 
        function(gitRepo) {
          var mappedRepo = {
            'id': gitRepo.id,
            'name': gitRepo.name, 
            'description': gitRepo.description, 
            'url': gitRepo.url, 
            'forks': gitRepo.forks
          };

          var storedRepo = new Repo(gitRepo);

          storedRepo.save() 
        });
        //console.log(res);
      } else {
        console.log(err);
      }
      console.log('Repos saved!')
      res.end();
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