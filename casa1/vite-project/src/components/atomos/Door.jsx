import React from 'react';

const Door = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
};

export default Door;
