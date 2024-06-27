import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import House from './House';

const HouseScene = ({ isDoorOpen }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <House isDoorOpen={isDoorOpen} /> {/* Pasar el estado de la puerta como prop */}
      <OrbitControls />
    </Canvas>
  );
};

export default HouseScene;