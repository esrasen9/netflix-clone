import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue } from '../../Context';

function Movie({ id }) {
  const [movie, setMovie] = useState();
  const { BASE_IMG_URL, BASE_URL, API_KEY } = useStateValue();

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((response) => setMovie(response.data))
      .catch((error) => alert(error.message));
  }, [API_KEY, BASE_URL, id]);

  return (
    <div className="movie">
      <img src={`${BASE_IMG_URL}${movie?.backdrop_path}`} alt="" />
      <h2 className="movie-title">{movie?.title}</h2>
    </div>
  );
}

export default Movie;
