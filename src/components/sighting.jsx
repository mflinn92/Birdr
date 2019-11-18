import React from 'react';

class Sighting extends React.Component {
  constructor(props) {
    super(props)
    let { date } = props.sighting;
    let formattedDate = date.slice(0,10).split('-');
    props.sighting.formattedDate = formattedDate;
    this.state = props.sighting;
  }

  render() {
    return (
      <div className="sighting">
        <div>
          <img src={`/sightings/${this.state._id}`} width="450px" height="375px" className="sightingImage" />
        </div>
        <div>
          <h3>{this.state.userFirstName} {this.state.userLastName}</h3>
          <h4>
            Species: <span>{this.state.species}: </span>
          </h4>
          <h4>
            Seen at: <span>{this.state.location}</span>
          </h4>
          <h4>
            Seen on: <span>{this.state.formattedDate[1]}-{this.state.formattedDate[2]}-{this.state.formattedDate[0]}</span>
          </h4>
        </div>
      </div>
    )
  }
}

export default Sighting;
