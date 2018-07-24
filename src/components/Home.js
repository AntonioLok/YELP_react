import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/Home.css';  

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: sessionStorage.getItem("logged") ? true : false,
      msg: "Successfully logged in!",
      item: null,
      place: null,
      itemError: null,
      placeError: null
    }
  }

  componentWillMount() {
    this.autocomplete();
    sessionStorage.removeItem("logged");
  }

  async autocomplete() {
    await fetch('https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer g2LQLACnXsY7miaSmgH2qmXl-kab1nQQ56sro1O8TcPJ1SsVuI-_pAnmm-yhWuOPIbv_FObao155N46KpaC4FOe_wZ8fivhzKIo03xJHxeRhzQZY14mn_H4sEhFWW3Yx'
      }
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(`Could not fetch data`);
      }
      return response.json()}
    )
    .then(data => {
      console.log(data);
    });
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.item? this.setState({itemError: null}) : this.setState({itemError: "This field is empty"});
    this.state.place? this.setState({placeError: null}) : this.setState({placeError: "This field is empty"});

    if (this.state.item !== null && this.state.item !== ""  && this.state.place !== null && this.state.place !== "") {
      this.props.history.push({
        pathname: "/search",
        state: {item: this.state.item, place: this.state.place}
      });
    }
  }

  render() {
    const form = (
      <form id="home" onSubmit={(event) => this.handleSubmit(event)}>
        <TextField
          floatingLabelText="Find cheap dinner, barbers, spas..."
          name="item"
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px"}}
          errorText={this.state.itemError}
        /> <br/>
        <TextField
          floatingLabelText="Near"
          name="place"
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px", marginBottom: "40px"}}
          errorText={this.state.placeError}
        /> <br/>
        <button
          style={
            {
              backgroundColor: "rgba(0, 0, 0, 0)",
              width: "90px"
            }
          } 
          type="submit"  
          className="material-icons md-36"> search
        </button>
    </form>
  );
    return (
      <MuiThemeProvider>
        <div id="home-container">
          {form}
          <Snackbar
            open={this.state.open}
            message={this.state.msg}
            autoHideDuration={2000}
            style={{textAlign: "center"}}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
