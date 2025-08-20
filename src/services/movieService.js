// src/services/movieService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies(endpoint, query = '') {
  const res = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      api_key: API_KEY,
      language: 'tr-TR',
      query // sadece search için kullanılır
    }
  });
  return res.data.results;
}

// Mevcut fonksiyonlar
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

// 🔹 Yeni fonksiyon: arama
export function searchMovies(query) {
  return fetchMovies('/search/movie',query);
}
