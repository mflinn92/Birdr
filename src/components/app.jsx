import React from 'react';
import axios from 'axios';

//testing file imput
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
        <img src='http://localhost:1234/sightings/5dd08f378974a4581a79cca6' />
      </div>
    )
  }
}

export default App;