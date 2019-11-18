import React from 'react';
import Sighting from './sighting.jsx';

const RecentSightings = ({ recentSightings }) => {

  return (
    <div className="sightingsList">
      {
        recentSightings.map((sighting) => {
          return <Sighting sighting={sighting} key={sighting._id}/>
        })
      }
    </div>
  )
}

export default RecentSightings;
