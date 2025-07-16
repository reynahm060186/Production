
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
      localStorage.setItem('jwtToken', res.data.access);
      onLogin(res.data.access);
      setError('');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Iniciar sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
