import { useState, useEffect } from 'react';
import { fetchGenres } from '../services/movieService';


export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.map((genre) => genre.name));
      } catch (err) {
        setError(err);
      }
    };

    loadGenres();
  }, []);

  return { genres, error };
};
