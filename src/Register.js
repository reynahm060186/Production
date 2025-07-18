
import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Registrar usuario
      await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
      setMessage('Usuario registrado correctamente, iniciando sesión...');

      // Intentar login para obtener token
      const res = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
      onRegister(res.data.access);  // Pasar token al padre

      // Limpiar inputs y mensaje después de login exitoso
      setUsername('');
      setPassword('');
      setMessage('');
    } catch (error) {
      setMessage('Error al registrar o iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Usuario"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrar</button>
      <p>{message}</p>
    </form>
  );
}

export default Register;
