import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ColorControlPage.css'; // Importar el archivo de estilos

const ColorControlPage = ({ user, handleOpenDoor, handleCloseDoor, handleOpenSecondGate, handleCloseSecondGate, handleACPower, isACOn }) => {
  const [pinInput, setPinInput] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  const handlePinChange = (e) => {
    setPinInput(e.target.value);
  };

  const handleOpen = () => {
    if (!user || !user.pin) {
      alert('Debe registrarse y configurar un PIN para abrir la puerta.');
      return;
    }

    if (pinInput === user.pin) {
      handleOpenDoor();
      alert('Puerta principal abierta.');
    } else {
      setAttemptCount(attemptCount + 1);
      if (attemptCount >= 4) {
        alert('Ingresó incorrectamente el PIN demasiadas veces. ¡Posible intrusión!');
        return;
      }
      alert('PIN incorrecto. Intente de nuevo.');
    }
  };

  const handleClose = () => {
    handleCloseDoor();
    alert('Puerta principal cerrada.');
  };

  const handleOpenSecondGateWithPin = () => {
    if (!user || !user.pin) {
      alert('Debe registrarse y configurar un PIN para abrir la segunda puerta.');
      return;
    }

    if (pinInput === user.pin) {
      handleOpenSecondGate();
      alert('Segunda puerta abierta.');
    } else {
      setAttemptCount(attemptCount + 1);
      if (attemptCount >= 4) {
        alert('Ingresó incorrectamente el PIN demasiadas veces. ¡Posible intrusión!');
        return;
      }
      alert('PIN incorrecto. Intente de nuevo.');
    }
  };

  const handleCloseSecondGateWithPin = () => {
    handleCloseSecondGate();
    alert('Segunda puerta cerrada.');
  };

  const handleTurnOnAC = () => {
    handleACPower(true);
    alert('Aire acondicionado encendido.');
  };

  const handleTurnOffAC = () => {
    handleACPower(false);
    alert('Aire acondicionado apagado.');
  };

  return (
    <div className="control-container">
      <h2>Control de Color y Puertas</h2>
      <div className="control-buttons">
        <button onClick={handleOpen}>Abrir Puerta Principal</button>
        <button onClick={handleClose}>Cerrar Puerta Principal</button>
        <button onClick={handleOpenSecondGateWithPin}>Abrir Segunda Puerta</button>
        <button onClick={handleCloseSecondGateWithPin}>Cerrar Segunda Puerta</button>
        <button onClick={handleTurnOnAC}>Encender Aire Acondicionado</button>
        <button onClick={handleTurnOffAC}>Apagar Aire Acondicionado</button>
      </div>
      <input className="pin-input" type="password" value={pinInput} onChange={handlePinChange} placeholder="Ingrese PIN" />
      <div className="link">
        <Link to="/">Volver a la Casa</Link>
      </div>
    </div>
  );
};

export default ColorControlPage;

