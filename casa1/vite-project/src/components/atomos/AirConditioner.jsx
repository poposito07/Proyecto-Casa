// components/atomos/AirConditioner.jsx
import React from 'react';

const AirConditioner = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default AirConditioner;
