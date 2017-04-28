var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: Number, //{type: Number, unique: true, dropDups: true}, 
  name: String,
  owner: String,
  description: String,
  url: String,
  forks: Number
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;