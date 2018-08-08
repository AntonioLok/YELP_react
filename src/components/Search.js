import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Search.css';  
import ReactStars from 'react-stars';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.match.params.term,
      location: this.props.match.params.location,
      offset: this.props.match.params.offset,
      data: null,
      loaded: null
    };
  }

  componentWillMount() {
    //const body = {term: this.state.term, location: this.state.location}
    this.getBusiness();
  }

  async getBusiness() {
    await axios.get('http://localhost:8000/api/search/' + this.state.term + "/"  + this.state.location + "/" + this.state.offset)
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

  handleChange(value) {
    this.props.history.push(value);
    window.location.reload();
  }

  render() {
    const getAddress = (restaurant) => {
      const address = [];
      for (var j = 0; j< restaurant.location.display_address.length; j++) {
        address.push(<h1 key={j}> {restaurant.location.display_address[j]} </h1>)
      }
      return address;
    }

    const restaurantDisplay = (restaurant) => {
      return (
        <div id="rest-display-container">
          <img src={restaurant.image_url} />
          <div id="main-detail">
            <div id="mid">
              <h1 style={{fontSize:"25px"}}><a href={"/business/" + restaurant.alias}> {restaurant.name} </a> </h1>
              <h1> Phone: {restaurant.display_phone} </h1>
              <h1> Price: {restaurant.price} </h1>
            </div>
            <div id="right">
              {getAddress(restaurant)}
            </div>
            <div id="right-right">
            <ReactStars
              count={5}
              size={25}
              edit={false}
              value={restaurant.rating}
              color2={'#ffd700'} />
              <h1> Reviewed by {restaurant.review_count} users</h1>
            </div>
          </div>
        </div>
      )
    };

    const restaurants = [];
    const pagList = [];
    let pagination = null;
    
      if (this.state.loaded) {
      for (var i=0; i < this.state.data.businesses.length; i++) {
        restaurants.push(<div key={i}> {restaurantDisplay(this.state.data.businesses[i])} </div>);
      }

      const length = this.state.data.total < 8*20? this.state.data.total : 9;
      for (var k = JSON.parse(this.state.offset); k <= length + JSON.parse(this.state.offset) ; k++) {
        pagList.push(
        <div id="pag-element" 
          key={k}
        >
          <li 
            value={k}
            onClick={(event)=> this.handleChange(event.target.getAttribute('value'))}> {k} 
          </li> 
        </div>
        )
      }

      const previous = (
        <div id="pag-element" onClick={() => this.handleChange(JSON.stringify(JSON.parse(this.state.offset) - 1))}> Previous </div>
      );

      const next = (
        <div id="pag-element" onClick={() => this.handleChange(JSON.stringify(JSON.parse(this.state.offset) + 1))}> Next </div>
      );

      pagination = (
        <div id="pagination-container">
          <ul id="pagination">
            {JSON.parse(this.state.offset)===1? null : previous}
            {pagList} 
            {next}
          </ul>
        </div>
      );
    }

    const notFound = (
      <h1> No results found for {this.state.term} in {this.state.location}. <a href="/home" > Please try another input. </a> </h1>
    )

    const found = (
      <div id="search-container">
        <div id="search-top">
          <div id="search-text"> {this.state.loaded? this.state.data.total : null} results found for {this.state.term} in {this.state.location}: </div>
        </div>
        <div id="restaurants-displays" style={{marginBottom: "60px"}}>
          {restaurants}
        </div>
          {pagination}
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
