import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { AiOutlineClose } from 'react-icons/ai';
import { useStateValue } from '../../Context';
import { addToList, removeFromList } from '../listMethods';

const BASE_YOUTUBE_URL = 'http://www.youtube.com/embed/';

function MovieDetails({ videoId, clickedMovie, setTrailerYoutubeId }) {
  const { user, myList } = useStateValue();
  const [inMyList, setInMyList] = useState();

  const handleClick = () => {
    inMyList ? removeFromList(clickedMovie, myList, user) : addToList(clickedMovie, myList, user);
    setInMyList(!inMyList);
  };

  useEffect(() => {
    setInMyList(myList.includes(clickedMovie?.id));
  }, [clickedMovie, myList]);

  return (
    <div className="movie-details">
      <Iframe
        url={`${BASE_YOUTUBE_URL}${videoId}`}
        className="react-player"
        width="56%"
        height="500px"
      />
      <div className="movie-video-overview">
        <div>
          <div className="overview-header">
            <h1 className="movie-overview-title">
              {clickedMovie.title}
              {' '}
            </h1>
            <button
              type="button"
              onClick={() => setTrailerYoutubeId(null)}
              className="close-button"
            >
              <AiOutlineClose
                size={30}
              />
            </button>
          </div>
          <p className="overview-text">{clickedMovie?.overview}</p>
        </div>
        {
          user && (
            <button
              type="button"
              onClick={handleClick}
              className="my-list-button"
            >
              { inMyList ? 'Remove from List' : 'Add to List' }
            </button>
          )
        }
      </div>
    </div>
  );
}

export default MovieDetails;
