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
      open: this.props.location.state? true : false,
      msg: "Successfully logged in!"
    }
  }

  componentWillMount() {
    this.props.history.push({
      pathname: "/home",
      state: false
    });
  }

  render() {
    const form = (
      <form id="home" onSubmit={(event) => this.handleSubmit(event)}>
        <TextField
          floatingLabelText="Find cheap dinner, barbers, spas..."
          name="item"
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px"}}
          errorText={this.state.emailError}
        />
        <TextField
          floatingLabelText="Near"
          name="place"
          onChange={(event) => this.handleChange(event)}
          style={{marginRight: "20px"}}
          errorText={this.state.passwordError}
        />
        <button 
        style={{backgroundColor: "rgba(0, 0, 0, 0)",
          border: "none",
          padding: "3px 10px 10px 10px"}} 
        type="submit"  
        class="material-icons"> search</button>
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
