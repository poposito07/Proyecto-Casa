// components/moleculas/Room.jsx
import React from 'react';

const Room = ({ position, dimensions, doorPositions, children }) => {
  return (
    <group position={position}>
      {/* Paredes y geometría de la habitación */}
      <mesh>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Puertas */}
      {doorPositions.map((doorPos, index) => (
        <mesh key={index} position={doorPos}>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      ))}

      {/* Otros elementos de la habitación */}
      {children}
    </group>
  );
};

export default Room;
