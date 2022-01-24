import React, { useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/banner/Banner';
import BannerPlayModal from '../components/banner/BannerPlayModal';
import Rows from '../components/rows/Rows';
import { useStateValue } from '../Context';

function Home() {
  const { BASE_URL, requests, setBannerMovie } = useStateValue();
  const getRandomNum = (length) => Math.floor(Math.random() * length - 1);

  useEffect(() => {
    axios.get(`${BASE_URL}${requests.trending}`)
      .then((response) => setBannerMovie(
        response.data.results[getRandomNum(response.data.results.length)],
      ))
      .catch((error) => alert(error.message));
  }, [BASE_URL, requests.trending, setBannerMovie]);

  return (
    <div>
      <Banner />
      <BannerPlayModal />
      <Rows />
    </div>
  );
}

export default Home;
