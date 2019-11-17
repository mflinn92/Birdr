import React from 'react';
import axios from 'axios';

//testing file imput
class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      file: null,
      recentSightings: [],
      modelPredictions: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.imgAnalyze = this.imgAnalyze.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('sightingPhoto', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post('/sightings', formData, config)
      .then((response) => {
        console.log('file uploaded');
      }).catch((err) =>{
        console.log(err);
      });
  }

  onChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  imgAnalyze() {
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
            <input type="file" name="sightingPhoto" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </label>
        </form>
        <img crossOrigin="anonymous" src='http://localhost:1234/sightings/5dd08f378974a4581a79cca6' width="450px" height="375px" className="analyze" ref={this.imageRef} />
        <div>
          <button onClick={this.imgAnalyze}>Analyze</button>
        </div>
      </div>
    )
  }
}

export default App;