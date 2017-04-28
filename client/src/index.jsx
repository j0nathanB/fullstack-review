import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import fakeData from '../../data.json'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: fakeData
    }
  }

  componentDidMount() {
    $.ajax({
      url: "/repos",
      type: "GET",
      success: function(data) {
        var display = JSON.parse(data);
        display.sort 
        this.setState = {repos: display};
        console.log(this.state.repos);
        // this.state = {repos: display};       
        //console.log(data);
      }.bind(this),
      error: function(err) {
        console.log('ERROR: ', err);
      }
    });
  }

  search (term) {
    $.post("/repos/import", {'query':`${term}`});
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      {this.state.repos.map( repo => <RepoList repo={repo} />)}
      There... are...  {this.state.repos.length} lights!
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));