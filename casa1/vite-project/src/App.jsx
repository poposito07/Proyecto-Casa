import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ColorControlPage from './components/organismo/ColorControlPage';
import HouseScene from './components/organismo/HouseScene';
import RegisterPage from './components/organismo/RegisterPage';

function App() {
  const [user, setUser] = useState(null);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isSecondGateOpen, setIsSecondGateOpen] = useState(false);
  const [isACOn, setIsACOn] = useState(false);

  useEffect(() => {
    const fetchDoorState = async () => {
      try {
        const response = await axios.get('http://localhost:3000/doors/state');
        setIsDoorOpen(response.data.state === 'open');
      } catch (error) {
        console.error('Error al obtener el estado de la puerta principal:', error);
      }
    };

    const fetchSecondGateState = async () => {
      try {
        const response = await axios.get('http://localhost:3000/second-gate/state');
        setIsSecondGateOpen(response.data.state === 'open');
      } catch (error) {
        console.error('Error al obtener el estado de la segunda puerta:', error);
      }
    };

    fetchDoorState();
    fetchSecondGateState();
  }, []);

  const handleRegister = (newUser) => {
    setUser(newUser);
  };

  const handleOpenDoor = () => {
    axios.post('http://localhost:3000/doors/state', { state: 'open' })
      .then(response => {
        setIsDoorOpen(true);
        alert('Puerta principal abierta correctamente');
      })
      .catch(error => {
        console.error('Error al abrir la puerta principal:', error);
        alert('Error al abrir la puerta principal');
      });
  };

  const handleCloseDoor = () => {
    axios.post('http://localhost:3000/doors/state', { state: 'closed' })
      .then(response => {
        setIsDoorOpen(false);
        alert('Puerta principal cerrada correctamente');
      })
      .catch(error => {
        console.error('Error al cerrar la puerta principal:', error);
        alert('Error al cerrar la puerta principal');
      });
  };

  const handleOpenSecondGate = () => {
    axios.post('http://localhost:3000/second-gate/state', { state: 'open' })
      .then(response => {
        setIsSecondGateOpen(true);
        alert('Segunda puerta abierta correctamente');
      })
      .catch(error => {
        console.error('Error al abrir la segunda puerta:', error);
        alert('Error al abrir la segunda puerta');
      });
  };

  const handleCloseSecondGate = () => {
    axios.post('http://localhost:3000/second-gate/state', { state: 'closed' })
      .then(response => {
        setIsSecondGateOpen(false);
        alert('Segunda puerta cerrada correctamente');
      })
      .catch(error => {
        console.error('Error al cerrar la segunda puerta:', error);
        alert('Error al cerrar la segunda puerta');
      });
  };

  const handleOpenAC = () => {
    setIsACOn(true);
    console.log('Aire acondicionado encendido.');
  };

  const handleCloseAC = () => {
    setIsACOn(false);
    console.log('Aire acondicionado apagado.');
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/control-color">Control de Color</Link>
            </li>
            <li>
              <Link to="/register">Registro</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route 
            path="/control-color" 
            element={<ColorControlPage 
              user={user} 
              handleOpenDoor={handleOpenDoor} 
              handleCloseDoor={handleCloseDoor} 
              handleOpenSecondGate={handleOpenSecondGate} 
              handleCloseSecondGate={handleCloseSecondGate} 
              handleTurnOnAC={handleOpenAC} 
              handleTurnOffAC={handleCloseAC} 
              isACOn={isACOn} 
              isSecondGateOpen={isSecondGateOpen} 
            />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage onRegister={handleRegister} />} 
          />
          <Route
            path="/"
            element={user ? <HouseScene isDoorOpen={isDoorOpen} isSecondGateOpen={isSecondGateOpen} isACOn={isACOn} /> : <Navigate to="/register" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;