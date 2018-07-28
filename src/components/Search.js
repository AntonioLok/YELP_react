import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Search.css';  
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.match.params.term,
      location: this.props.match.params.location,
      data: null,
      loaded: null
    };
  }

  async componentWillMount() {
    //const body = {term: this.state.term, location: this.state.location}
    await axios.get('http://localhost:8000/api/search/' + this.state.term + "/"  + this.state.location)
      .then((result) => 
        {if(result.data.success) {
          this.setState({data: result.data.data, loaded: true});
          console.log(result.data.data)
        } else {
          alert(result.data.message);
      }
    })
    .catch(error => console.log(error));
  }

  render() { 
    const notFound = (
      <h1> No results found for {this.state.term} in {this.state.location}. <a href="/home" > Please try another input. </a> </h1>
    )

    const found = (
      <div id="search-top">
        <div id="search-text"> {this.state.loaded? this.state.data.businesses.length : null} results found for {this.state.term} in {this.state.location}: </div>
      </div>
    )

    return (
      <div>
        {
          this.state.loaded? 
          this.state.data.businesses.length === 0?
            notFound : found
          : null
        }
      </div>
    );
  }
}

export default Search;
