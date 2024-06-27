// components/organismo/RegisterPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Importar el archivo CSS de estilos

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        username,
        password,
        email,
        pin,
        role
      });

      console.log(response.data);
      
      alert('Usuario registrado correctamente');
      onRegister({ username, password, email, pin, role }); // Llamar a la función onRegister para actualizar el estado en App.jsx
      navigate('/'); // Redirigir a la página de inicio después del registro exitoso
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          PIN (4 dígitos):
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} minLength={4} maxLength={4} required />
        </label>
        <label>
          Role:
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
