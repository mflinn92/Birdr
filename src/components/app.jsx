import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';
import RecentSightings from './recentSightings.jsx';

//testing file imput
class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      recentSightings: [],
    };
    this.getRecentSightings = this.getRecentSightings.bind(this);
    this.addSighting = this.addSighting.bind(this);
    this.deleteSighting = this.deleteSighting.bind(this);
  }

  componentDidMount() {
    this.getRecentSightings();
  }

  addSighting(sighting) {
    let currentSightings = this.state.recentSightings;
    currentSightings.unshift(sighting);
    this.setState({
      recentSightings: currentSightings
    });
  }

  getRecentSightings() {
    axios.get('/sightings')
      .then(({ data }) => {
        this.setState({
          recentSightings: data
        });
      });
  }

  deleteSighting(sightingId) {
    this.state.recentSightings.forEach((sighting, index) => {
      if (sighting._id === sightingId) {
        let newSightings = this.state.recentSightings.slice();
        newSightings.splice(index, 1);
        this.setState({
          recentSightings: newSightings
        });
      }
    });
    axios.delete('/sightings', {data: {id: sightingId}})
      .then(res => console.log('sighting deleted'))
      .catch(res => console.log('error deleting sighting'));
  }

  render() {
    return (
      <div className="container">
        <RecentSightings recentSightings={this.state.recentSightings} deleteSighting={this.deleteSighting} />
        <Form addSighting={this.addSighting} />
      </div>

    )
  }
}

export default App;