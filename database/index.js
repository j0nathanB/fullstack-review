var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  url: String,
  forks: Number
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;