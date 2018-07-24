import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.location.state.item,
      place: this.props.location.state.place
    };
  }

  render() {
    return (
      <div>
        {this.state.item}
        {this.state.place}
      </div>
    );
  }
}

export default Search;
