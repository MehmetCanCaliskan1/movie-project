 // src/services/movieService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies(endpoint) {
  const res = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      api_key: API_KEY,
      language: 'tr-TR'
    }
  });
  return res.data.results;
}

export default function popular() {
  return fetchMovies('/movie/popular');

}

export function nowPlaying() {
  return fetchMovies('/movie/now_playing');
}

export function upcoming() {
  return fetchMovies('/movie/upcoming');
}

export function topRated() {
  return fetchMovies('/movie/top_rated');
}
 

