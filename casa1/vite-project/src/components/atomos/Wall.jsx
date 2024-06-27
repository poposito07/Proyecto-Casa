import React from 'react';

const Wall = ({ position, dimensions }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Wall;
