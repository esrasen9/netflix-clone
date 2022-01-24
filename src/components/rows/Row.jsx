import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from '../../Context';
import MovieDetails from './MovieDetails';

function Row({ title, fetchUrl, isFirstRow }) {
  const { BASE_IMG_URL, BASE_URL, API_KEY } = useStateValue();
  const [movies, setMovies] = useState([]);
  const [clickedMovie, setClickedMovie] = useState({});
  const [trailerYoutubeId, setTrailerYoutubeId] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}${fetchUrl}`)
      .then((response) => response.data.results)
      .then((results) => setMovies(results))
      .catch((error) => alert(error.message));
  }, [BASE_URL, fetchUrl]);

  const getTrailer = (id, movie) => {
    setClickedMovie(movie);
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => setTrailerYoutubeId(response.data.videos.results[0].key))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-movies">
        {
          movies.map((movie) => {
            const {
              id, name, poster_path, backdrop_path,
            } = movie;
            return (
              <div
                key={id}
                className="poster"
              >
                <img
                  onClick={() => getTrailer(id, movie)}
                  className={`poster-img ${isFirstRow ? 'first-row-img' : ''}`}
                  src={`${BASE_IMG_URL}${isFirstRow ? poster_path : backdrop_path}`}
                  alt={name}
                  role="presentation"
                />
              </div>
            );
          })
        }
      </div>
      {trailerYoutubeId && (
      <MovieDetails
        setTrailerYoutubeId={setTrailerYoutubeId}
        clickedMovie={clickedMovie}
        videoId={trailerYoutubeId}
      />
      )}
    </div>
  );
}

export default Row;
