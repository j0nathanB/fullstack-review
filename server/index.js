var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var Repo = require('../database/index.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  var query = JSON.stringify(req.body.query);
  var isInDB = false;

  Repo.find({owner: req.body.query}, function (err, data) {
    if (err) { 
      console.log(err);
      return;
    } else 
    if(data.length > 0) {
      console.log("User already in DB")
      //send data to the model;
    } else {

      var options = {
        url: 'https://api.github.com/search/repositories?q=user:' + req.body.query,
        headers: {
          'User-Agent': 'jlb1982'
        }
      };

      request(options, function (err, resp, body) {
        if (!err && resp.statusCode == 200) {  
          var parsedBody = JSON.parse(body);
          
          parsedBody.items.forEach( 
            function(gitRepo) {
              //console.log('owner: ', gitRepo.owner.login)
              var mappedRepo = new Repo ({
                'id': gitRepo.id,
                'name': gitRepo.name, 
                'owner': gitRepo.owner.login,
                'description': gitRepo.description, 
                'url': gitRepo.url, 
                'forks': gitRepo.forks
              });

              //var storedRepo = new Repo(mappedRepo);

              mappedRepo.save() 
              //console.log(storedRepo);
            });
          } else {
            console.log(err);
          }
          console.log('Repos saved!')  
      })
      res.end();
    }
  });
});

app.get('/repos', function (req, res) {

  Repo.find({owner: 'jlb1982'}, function (err, data) {
      if (err) {
      console.log(err);
      return;
    } else {
      console.log(data)
    }
  });


  res.end();
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});