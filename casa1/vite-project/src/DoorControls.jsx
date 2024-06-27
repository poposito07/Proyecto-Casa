// components/DoorControls.js
import React from 'react';

const DoorControls = ({ doorOpen, openDoor, closeDoor }) => {
  return (
    <div>
      <h2>Control de Puerta</h2>
      <button onClick={openDoor} disabled={doorOpen}>Abrir Puerta</button>
      <button onClick={closeDoor} disabled={!doorOpen}>Cerrar Puerta</button>
    </div>
  );
};

export default DoorControls;
