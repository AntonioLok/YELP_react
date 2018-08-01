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
      msg: "Successfully logged in!",
      item: null,
      place: null,
      itemError: null,
      placeError: null
    }
  }

  componentDidMount() {
    sessionStorage.removeItem("logged");
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
        pathname: "/search/" + this.state.item + "/" + this.state.place + "/1"
      });
    }
  }

  render() {
    const form = (
      <form id="home" onSubmit={(event) => this.handleSubmit(event)}>
        <TextField
          floatingLabelText="Find cheap dinner, barbers, spas..."
          name="item"
          floatingLabelStyle={{color: "purple"}}
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px"}}
          errorText={this.state.itemError}
        /> <br/>
        <TextField
          floatingLabelText="Near"
          name="place"
          floatingLabelStyle={{color: "purple"}}
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px", marginBottom: "40px"}}
          errorText={this.state.placeError}
        /> <br/>
        <button
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
            open={sessionStorage.getItem("logged") ? true : false}
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