
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate que App.css esté enlazado

function MovieGallery({ token }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/movies/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar las películas');
      }
    };
    if (token) fetchMovies();
  }, [token]);

  return (
    <div className="gallery-container">
      <h2>PELÍCULAS DISPONIBLES</h2>
      {error && <p>{error}</p>}
      <ul className="movie-list">
        {movies.map((m, i) => (
          <li className="movie-item" key={i}>
            <strong>{m.title}</strong> <br />({m.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieGallery;
