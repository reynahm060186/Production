
import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import MovieGallery from './MovieGallery';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    setToken(savedToken);
  }, []);

  return (
    <div className="App">
      <h1 className="cecyflix-logo">CECYFLIX</h1>
      <Register />
      <Login onLogin={setToken} />
      {token ? <MovieGallery token={token} /> : <p>Inicia sesión para ver las películas</p>}
    </div>
  );
}

export default App;
