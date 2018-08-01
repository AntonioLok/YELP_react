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

  async componentWillMount() {
    //const body = {term: this.state.term, location: this.state.location}
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
      if (this.state.loaded) {
      for (var i=0; i < this.state.data.businesses.length; i++) {
        restaurants.push(<div key={i}> {restaurantDisplay(this.state.data.businesses[i])} </div>);
      }
    }

    // Hard coded still does not work
    const pagination = (
      <div id="pagination-container">
        <ul id="pagination">
          <div id="pag-element"> <li> {"<"} </li> </div>
          <div id="pag-element" onClick={()=> this.props.history.push("1")}> <li> 1 </li> </div>
          <div id="pag-element" onClick={()=> this.props.history.push("2")}> <li> 2 </li> </div>
          <div id="pag-element" onClick={()=> this.props.history.push("3")}> <li> 3 </li> </div>
          <div id="pag-element"> <li> {"4"} </li> </div>
          <div id="pag-element"> <li> {"5"} </li> </div>
          <div id="pag-element"> <li> {">"} </li> </div>
        </ul>
      </div>
    )

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
