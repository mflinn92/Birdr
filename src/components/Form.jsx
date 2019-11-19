import React from 'react';
import axios from 'axios';
import Analysis from './analysis.jsx';

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
      imagePreview: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg',
      modelPredictions: [],
      analyzing: 0,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.imgAnalyze = this.imgAnalyze.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.analysisStatus = this.analysisStatus.bind(this);
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

    axios.post('/sightings', formData, config)
      .then((response) => {
        this.props.addSighting(response.data);
      }).catch((err) =>{
        console.log(err);
      });
    this.setState({
      file: null,
      imagePreview: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg'
    });
    event.target.reset();
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
      analyzing: 0,
    });
  }

  imgAnalyze(event) {
    event.preventDefault();
    this.setState({
      analyzing: 1
    });
    const { current } = this.imageRef;
    mobilenet.load()
      .then((model) => {
        return model.classify(current);
      })
      .then((prediction) => {
        this.setState({
          modelPredictions: prediction,
          analyzing: 2,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  analysisStatus() {
    switch (this.state.analyzing) {
      case 1:
        return (
          <div className="analysis">
            <h5>Birdr is analyzing your photo...</h5>
          </div>
        );
      case 2:
        return (
          <Analysis modelPredictions={this.state.modelPredictions} />
        )
      default:
        return (<div></div>);
    }
  }

  render() {
    return (
      <div className="sightingForm">
        <h2>Add a Sighting</h2>
        <hr className="border"></hr>
        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
          <label className="photoUpload">
            Upload Photo
            <input type="file"
              name="sightingPhoto"
              onChange={this.onFileChange}
            />

          </label>
            {this.state.imagePreview && (
            <div className="imagePreview">
              <img crossOrigin="anonymous"
                src={this.state.imagePreview}
                width="450px" height="375px"
                className="analyze"
                ref={this.imageRef}
                alt=''
              />
              <div className="analyze">
                <button onClick={this.imgAnalyze}>Analyze</button>
                <div>
                  {this.analysisStatus()}
                </div>
              </div>
            </div>
            )}
          <hr className="border"></hr>
          <div className="sightingInfo">
            <label>
              First Name:
              <input type="text"
                value={this.state.firstName}
                onChange={this.onTextChange}
                name="userFirstName"
              />
            </label>
            <br></br>
            <label>
              Last Name:
              <input type="text"
                value={this.state.firstName}
                onChange={this.onTextChange}
                name="userLastName"
              />
            </label>
            <br/>
            <label>
              Location:
              <input type="text"
                value={this.state.firstName}
                onChange={this.onTextChange}
                name="location"
              />
            </label>
            <br/>
            <label>
              Species:
              <input type="text"
                value={this.state.firstName}
                onChange={this.onTextChange}
                name="species"
              />
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Form;
