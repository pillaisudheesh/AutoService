import React from 'react';
import OpenLayersMap from '../../components/OpenLayersMap';

const DisplayInMap = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Service Providers</h1>
      <OpenLayersMap />
    </div>
  )
}

export default DisplayInMap;
