import React from 'react';
import axios from 'axios';
import './Banner.css';
import { useStateValue } from '../../Context';

function Banner() {
  const {
    BASE_URL, BASE_IMG_URL, API_KEY, setOpenPlayModal, setBannerYoutubeId,
    bannerMovie,
  } = useStateValue();

  const truncateString = (str, num) => {
    if (num > str.length) {
      return str;
    }
    return `${str.substring(0, num)}...`;
  };

  const getTrailer = () => {
    axios.get(`${BASE_URL}/movie/${bannerMovie?.id}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => setBannerYoutubeId(response.data.videos.results[0].key))
      .then(() => setOpenPlayModal(true))
      .catch((error) => alert(error.message));
  };

  return (
    <div
      className="banner-container"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${BASE_IMG_URL}/${bannerMovie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{bannerMovie?.title}</h1>
        <h2 className="banner-overview">
          {bannerMovie?.overview && truncateString(bannerMovie?.overview, 260)}
        </h2>
        <div className="banner-buttons">
          <button
            type="button"
            onClick={getTrailer}
            className="banner-button play-button"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
