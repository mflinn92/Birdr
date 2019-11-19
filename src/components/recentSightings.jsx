import React from 'react';
import Sighting from './sighting.jsx';

const RecentSightings = ({ recentSightings }) => {

  return (
    <div className="sightingsList">
      <h2>Recent Sightings</h2>
      {
        recentSightings.map((sighting) => {
          return <Sighting sighting={sighting} key={sighting._id}/>
        })
      }
    </div>
  )
}

export default RecentSightings;
