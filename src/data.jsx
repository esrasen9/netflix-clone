const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const requests = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const rowCategories = [
  {
    id: 1,
    title: 'Trending Now',
    fetchUrl: requests.trending,
    isFirstRow: true,
  },
  {
    id: 2,
    title: 'Top Rated',
    fetchUrl: requests.topRated,
  },
  {
    id: 3,
    title: 'Action Movies',
    fetchUrl: requests.actionMovies,
  },
  {
    id: 4,
    title: 'Comedy Movies',
    fetchUrl: requests.comedyMovies,
  },
  {
    id: 5,
    title: 'Horror Movies',
    fetchUrl: requests.horrorMovies,
  },
  {
    id: 6,
    title: 'Romance Movies',
    fetchUrl: requests.romanceMovies,
  },
  {
    id: 7,
    title: 'Documentaries',
    fetchUrl: requests.documentaries,
  },
];
