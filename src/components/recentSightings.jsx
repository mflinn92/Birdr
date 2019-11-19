import React from 'react';
import Sighting from './sighting.jsx';

const RecentSightings = ({ recentSightings, deleteSighting }) => {

  return (
    <div className="sightingsList">
      <h2>Recent Sightings</h2>
      {
        recentSightings.map((sighting, index) => {
          return <Sighting sighting={sighting} key={sighting._id} deleteSighting={deleteSighting} />
        })
      }
    </div>
  )
}

export default RecentSightings;
