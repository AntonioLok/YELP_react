import React, { Component } from 'react';
import axios from 'axios';
import '../styles/ProfilePic.css';
import CircularProgress from 'material-ui/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadInput: null,
      img: null,
      disabled : false,
      loading: false,
      preview: null,
    };
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.files[0], preview: URL.createObjectURL(e.target.files[0])});
  }

  async handleUploadImage(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.uploadInput);
    this.setState({uploadInput: null, loading: true});
    await axios.put('http://localhost:8000/api/upload/img/' + JSON.parse(sessionStorage.getItem("user"))._id, data)
      .then((result) => 
      {   
        if (result.data.success) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("updated", result.data.message)
          this.props.history.push("./..");
        } else {
          this.setState({loading: false});
          alert(result.data.message);
        }
      })
      .catch(error => console.log(error));
    }
  
  render() {
    return (
      <MuiThemeProvider>
        <div id="profile-pic-container">
          <h2> Change your Profile Picture </h2>
          <form id="profile-pic-update" onSubmit={(event) => this.handleUploadImage(event)}>
            <div>
              <label id="file"> Enter your file 
                <input type="file" name="uploadInput" onChange={(event)=> this.handleChange(event)}/>
              </label>
            </div> 
            <br /><br />
            <img id="preview" src={this.state.preview} />
            <div>
              <button type="submit" style={{width: "100px", position: "relative", paddingLeft: "30px", marginRight:"30px"}} disabled={this.state.uploadInput? false : true }>
              <CloudUploadIcon style={{position: "absolute", left: "10px", top: "5px"}}/> Upload
              </button>
    
              {this.state.img? <img src={"data:image/jpeg;base64," + this.state.img} /> : null}
              {this.state.loading? 
              (<span>
                  <CircularProgress color="rgb(153, 51, 102)"/>
              </span>) : null
              }
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ProfilePic;
