import React from 'react';
import AirConditioner from '../atomos/AirConditioner';
import Wall from '../atomos/Wall';
import Bathroom from '../moleculas/Bathroom';
import Room from '../moleculas/Room';

const House = ({ isDoorOpen, isSecondGateOpen, isACOn }) => {
  const doorColor = isDoorOpen ? 'blue' : 'black';
  const gateColor = isSecondGateOpen ? 'red' : 'black';
  const acColor = isACOn ? 'yellow' : 'orange';

  return (
    <group>
      <Wall position={[0, 1, -15]} dimensions={[30, 6, 0.1]} />
      <Wall position={[0, 1, 15]} dimensions={[30, 6, 0.1]} />
      <Wall position={[15, 1, 0]} dimensions={[0.1, 6, 30]} />
      <Wall position={[-15, 1, 0]} dimensions={[0.1, 6, 30]} />

      <mesh position={[0, -2, -19.9]}>
        <boxGeometry args={[30, 0.01, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <mesh position={[9, 0, -15.5]} rotation={[0, Math.PI / 100, 0]}>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color={doorColor} />
      </mesh>

      <mesh position={[-5, 0.5, -15.5]} rotation={[0, Math.PI / 100, 0]}>
        <boxGeometry args={[9, 4, 0.1]} />
        <meshStandardMaterial color={gateColor} />
      </mesh>

      <Room position={[7.5, -1, 10.3]} dimensions={[11, 4, 6]} doorPositions={[[0, 0, -3]]}>
        <AirConditioner position={[5, 2, -2]} isOn={isACOn} color={acColor} />
      </Room>

      <Room position={[-8.5, -1, 10]} dimensions={[12, 4, 8]} doorPositions={[[0, 0, -4]]} />
      <Room position={[-6.9, -1, -2]} dimensions={[15, 4, 9]} doorPositions={[[0, 0, -4.5]]} />

      <Bathroom position={[12.5, -2, 0]} dimensions={[1, 4, 9]} doorPositions={[[0, 0, -4.5]]} />
    </group>
  );
};

export default House;