// src/services/movieService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies(endpoint, query = '',page=1) {
  const res = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      api_key: API_KEY,
      language: 'tr-TR',
      query ,page
    }
  });
  return res.data.results;
}

// Mevcut fonksiyonlar
export default function popular(page=1) {
  return fetchMovies('/movie/popular', '', page);
}

export function nowPlaying(page=1) {
  return fetchMovies('/movie/now_playing', '', page);
}

export function upcoming(page=1) {
  return fetchMovies('/movie/upcoming', '', page);
}

export function topRated(page=1) {
  return fetchMovies('/movie/top_rated','',page);
}

// 🔹 Yeni fonksiyon: arama
export function searchMovies(query,page=1) {
  return fetchMovies('/search/movie', query, page);
}


export const trendingToday = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=tr-TR`);
  const data = await res.json();
  return data.results || [];
};

export const trendingWeek = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=tr-TR`);
  const data = await res.json();
  return data.results || [];
};
