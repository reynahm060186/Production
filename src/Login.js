import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      setMessage('Inicio de sesión exitoso.');
      setError('');
      onLogin(res.data.access);
    } catch (err) {
      setError('Credenciales inválidas.');
      setMessage('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
      });
      setMessage('Usuario registrado correctamente. Ahora inicia sesión.');
      setError('');
      setIsRegistering(false);
      resetForm();
    } catch (err) {
      setError('Error al registrar. El usuario ya puede existir.');
      setMessage('');
    }
  };

  return (
    <div>
      <h1 className="cecyflix-logo">CECYFLIX</h1>

      {!isRegistering ? (
        <>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
          <p style={{ color: 'green' }}>{message}</p>
          <p style={{ color: 'red' }}>{error}</p>
          <p>
            ¿No tienes cuenta?{' '}
            <span
              onClick={() => {
                setIsRegistering(true);
                resetForm();
              }}
              style={{ color: '#e50914', cursor: 'pointer' }}
            >
              Regístrate
            </span>
          </p>
        </>
      ) : (
        // Solo aparece si hacen clic en "Regístrate"
        <>
          <h2>Crear cuenta</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
          <p style={{ color: 'green' }}>{message}</p>
          <p style={{ color: 'red' }}>{error}</p>
          <p>
            ¿Ya tienes cuenta?{' '}
            <span
              onClick={() => {
                setIsRegistering(false);
                resetForm();
              }}
              style={{ color: '#e50914', cursor: 'pointer' }}
            >
              Inicia sesión
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
