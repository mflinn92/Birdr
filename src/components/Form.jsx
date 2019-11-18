import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      file: null,
      _id: '',
      userFirstName: '',
      userLastName: '',
      location: '',
      species: '',
      imagePreview: null,
      modelPredictions: [],
      analysisImgId:'',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.imgAnalyze = this.imgAnalyze.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('sightingPhoto', this.state.file);
    formData.append('userFirstName', this.state.userFirstName);
    formData.append('userLastName', this.state.userLastName);
    formData.append('location', this.state.location);
    formData.append('species', this.state.species);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    console.log(formData);
    axios.post('/sightings', formData, config)
      .then((response) => {
        console.log(response);
      }).catch((err) =>{
        console.log(err);
      });
  }

  onTextChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  onFileChange(event) {
    this.setState({
      file: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0]),
    });
  }

  imgAnalyze(event) {
    event.preventDefault();
    const { current } = this.imageRef;
    mobilenet.load()
      .then((model) => {
        return model.classify(current);
      })
      .then((prediction) => {
        this.setState({modelPredictions: prediction});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
          <label>
            Photo Upload
            <input type="file" name="sightingPhoto" onChange={this.onFileChange} />

          </label>

            {this.state.imagePreview && (
            <div className="imagePreview">
              <img crossOrigin="anonymous"
                src={this.state.imagePreview}
                width="450px" height="375px"
                className="analyze"
                ref={this.imageRef}
              />
              <div className="analyze">
                <button onClick={this.imgAnalyze}>Analyze</button>
              </div>
            </div>
            )}
          <div className="sightingInfo">
            <label>
              First Name:
              <input type="text" value={this.state.firstName} onChange={this.onTextChange} name="userFirstName"/>
            </label>
            <br></br>
            <label>
              Last Name:
              <input type="text" value={this.state.firstName} onChange={this.onTextChange} name="userLastName"/>
            </label>
            <br/>
            <label>
              Location:
              <input type="text" value={this.state.firstName} onChange={this.onTextChange} name="location"/>
            </label>
            <br/>
            <label>
              Species:
              <input type="text" value={this.state.firstName} onChange={this.onTextChange} name="species"/>
            </label>
          </div>
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Form;