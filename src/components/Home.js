import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
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
    return (
      <MuiThemeProvider>
        <div id="home-container">
          <TextField
            floatingLabelText="Full Name"
          /><br />
          <TextField
            floatingLabelText="Full Name"
          /><br />
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
