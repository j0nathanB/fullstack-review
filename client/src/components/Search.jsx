import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: 'yo mama'
    }
  }

  onChange (e) {
    //console.log(this.state.terms)
    this.setState({
      terms: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.terms);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;