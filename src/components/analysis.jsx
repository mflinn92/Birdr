import React from 'react';

const Analysis = ({ modelPredictions }) => {
  const species = modelPredictions[0].className;
  let { probability } = modelPredictions[0];
  probability = Math.floor(probability * 100);
  return (
    <div className="analysis">
      <h5>
        Birdr Species Prediction: <span>{species}</span>
      </h5>
      <h5>
        Birdr is {probability}% sure!
      </h5>
      <h6>
        It could also be a {modelPredictions[1].className}
      </h6>
    </div>
  )
}

export default Analysis;
