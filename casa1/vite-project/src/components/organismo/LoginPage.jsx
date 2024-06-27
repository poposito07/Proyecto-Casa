// components/organismo/LoginPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importar el archivo CSS de estilos

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password
      });

      console.log(response.data);
      onLogin(response.data); // Llamar a la función onLogin para actualizar el estado de usuario en App.jsx
      navigate('/'); // Redirigir a la página de inicio después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
