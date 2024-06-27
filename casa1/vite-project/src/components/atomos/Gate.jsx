// components/atomos/Gate.jsx

import React from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

const Gate = ({ position, isOpen, color }) => {
  // Rotación del portón basada en su estado (abierto o cerrado)
  const rotationY = isOpen ? Math.PI / 2 : 0;

  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <boxGeometry args={[3, 4, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Gate;
