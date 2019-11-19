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

  render() {
    return (
      <div className="container">
        <RecentSightings recentSightings={this.state.recentSightings} />
        <Form addSighting={this.addSighting} />
      </div>

    )
  }
}

export default App;