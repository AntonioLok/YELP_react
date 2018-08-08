import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';
import '../styles/WriteReview.css';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const form = (
      <form style={{textAlign:"center"}}>
        <h5> Review for {(this.props.match.params.name)} </h5>
        <textarea id="review-input" 
          placeholder="Your review helps others learn about great local businesses. 

          Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
          maxlength="1000" 
        ></textarea>
        <h1> Please give your rating: </h1>
        <ReactStars
          className="stars"
          count={5}
          size={40}
          edit={true}
          color2={'#ffd700'} />
      
      <button style={{width: "170px"}}> Post your review </button>
      </form>
    );

    return (
      <MuiThemeProvider>
        {form}
      </MuiThemeProvider>
    );
  }
}

export default WriteReview;
