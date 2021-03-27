import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'f99f53a5a0e694d60910f33dfe4d9d4d';
const IMG_URL = `https://image.tmdb.org/t/p/w300/`;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  imgSize: 'w500',
};

const getTrendingMovies = () => {
  return axios
    .get(`trending/all/day?api_key=${API_KEY}`)
    .then(({ data }) => data.results);
};

const getMovieQuery = query => {
  //console.log(query);
  return axios
    .get(
      `${BASE_URL}search/movie${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
    )
    .then(({ data }) => data.results);
};

const getMovieDetails = movieId => {
  return axios
    .get(`movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data);
};

const getCast = movie_id => {
  return axios
    .get(`movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data.cast);
};

const getReview = movie_id => {
  return axios
    .get(`movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data.results);
};

getTrendingMovies.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};

export {
  getTrendingMovies,
  getMovieQuery,
  getMovieDetails,
  getCast,
  IMG_URL,
  getReview,
};
