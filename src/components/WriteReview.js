import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';
import '../styles/WriteReview.css';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      stars : null
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("signedUp");
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  ratingChanged(value) {
    this.setState({stars: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.stars === null || this.state.text === null || this.state.text ==="") {
      alert("Please fill out both the review and rating.")
    } else {
      
    }
  }

  render() {

    const form = (
      <form style={{textAlign:"center"}} onSubmit={(event) => this.handleSubmit(event)}>
        <h5> Review for {(this.props.match.params.name)} </h5>
        <textarea id="review-input" 
          placeholder="Your review helps others learn about great local businesses. 

          Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
          maxLength="1000"
          name="text"
          onChange={(event) => this.handleChange(event)}
        ></textarea>
        <h1> Please give your rating: </h1>
        <ReactStars
          className="stars"
          count={5}
          size={40}
          edit={true}
          value={this.state.stars}
          onChange={(newValue) => this.ratingChanged(newValue)}
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
