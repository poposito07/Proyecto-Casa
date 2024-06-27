import React from 'react';

const Window = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Window;
