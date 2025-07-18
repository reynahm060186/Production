// MovieGallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function MovieGallery({ token }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar las películas');
      }
    };

    if (token) {
      fetchMovies();
    }
  }, [token]);

  return (
    <div className="gallery-container">
      <h2>PELÍCULAS DISPONIBLES</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="gallery">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <h3>{movie.title}</h3>
            <p><strong>Género:</strong> {movie.genre}</p>
            <p><strong>Duración:</strong> {movie.duration} min</p>
            <p><strong>Calificación:</strong> {movie.rating}/10</p>
            <p>{movie.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieGallery;
