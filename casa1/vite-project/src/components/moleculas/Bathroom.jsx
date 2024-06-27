import React from 'react';
import Room from './Room';

const Bathroom = ({ position }) => {
  return (
    <Room position={position} dimensions={[3, 2, 3]} doorPositions={[[1, 1, 0.1]]} />
  );
};

export default Bathroom;
