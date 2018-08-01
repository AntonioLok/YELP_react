import React, { Component } from 'react';
import axios from 'axios';
//import { withGoogleMap, GoogleMap } from 'react-google-maps';
import '../styles/Review.css'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentIndex: 0
    };
  }

  async componentWillMount() {
    await axios.get('http://localhost:8000/api/business/' + this.props.match.params.name)
      .then((result) => 
        {
          if(result.data.success) {
            console.log(result.data.data);
            this.setState({data: result.data.data});
        } else {
          alert(result.data.message);
      }
    })
    .catch(error => console.log(error));
  } 

  previous() {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
  };

  next() {
    if (this.state.currentIndex !== this.state.data.photos.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1})
    }
  };

  render() {
    
    let businessInfo = null;

    let leftIconStyleActive = {
      color: "white",
      position: "absolute",
      bottom: "168px",
      cursor: "pointer"
    };

    let leftIconStyleNonActive = {
      display: "none"
    };

    let rightIconStyleActive = {
      color: "white",
      position: "absolute",
      right: "0px",
      bottom: "168px",
      cursor: "pointer"
    }

    let rightIconStyleNonActive = {
      display: "none"
    };

    if (this.state.data) {
      const title = (
        <div id="search-top">
          <div id="search-text"> {this.state.data.name} </div>
        </div>
      );

      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const hoursInfo = [];
      
      for (var i = 0; i < this.state.data.hours[0].open.length; i++) {
        let open = this.state.data.hours[0].open[i].start;
        open = open.slice(0,2) + ":" + open.slice(2,4)
        let end = this.state.data.hours[0].open[i].end;
        end = end.slice(0,2) + ":" + end.slice(2,4)
        hoursInfo.push(<div key={i}> <span id="info"> {days[this.state.data.hours[0].open[i].day]} </span> 
          {open} - {end} 
        </div>);
      };

      const address = [];
      for (var j = 0; j< this.state.data.location.display_address.length; j++) {
        address.push(<div key={j}> {this.state.data.location.display_address[j]} </div>)
      }

      const pictureSlides = (
        <div id="slider-container">
          <i className="material-icons md-36"
          style={this.state.currentIndex==0? leftIconStyleNonActive : leftIconStyleActive}
          onClick={()=> {this.previous();}}
          >
            keyboard_arrow_left
          </i>
          <img src={this.state.data.photos[this.state.currentIndex]} />
          <i className="material-icons md-36" 
          style={this.state.currentIndex===(this.state.data.photos.length - 1)? rightIconStyleNonActive :  rightIconStyleActive}
          onClick={()=> this.next()}
          >
            keyboard_arrow_right
          </i>
        </div>
      );

      const mainPart = (
        <div id="main-part" >
          <div id="business-info"> 
            <h3> Price </h3> {this.state.data.price}
            <h3> Phone # </h3> {this.state.data.phone}
            <h3> Hours ({this.state.data.is_closed===false? <div style={{color: "green", display: "inline"}}> Open </div> : <div style={{color: "red"}}> Closed now  </div>}) </h3> {hoursInfo}
            <h3> Address </h3> {address}
          </div>
          <div id="business-review">
            {pictureSlides}
          </div>
        </div>
      );

      businessInfo = (
        <div id="business-info-container">
          {title}
          {mainPart}
        </div>
      );
    }
    
    return (
      <MuiThemeProvider>
        <div>
          {this.state.data? businessInfo : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Review