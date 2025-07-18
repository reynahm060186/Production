import React, { useState, useEffect } from 'react';
import Login from './Login';
import MovieGallery from './MovieGallery';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <div className="App">
      <h1 className="cecyflix-logo">CECYFLIX</h1>

      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <button
            onClick={handleLogout}
            style={{
              marginBottom: '20px',
              backgroundColor: '#e50914',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cerrar sesión
          </button>
          <MovieGallery token={token} />
        </>
      )}
    </div>
  );
}

export default App;
