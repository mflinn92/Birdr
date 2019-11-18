import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

//testing file imput
class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      recentSightings: [],
    };
  }

  render() {
    return (
      <Form />
    )
  }
}

export default App;