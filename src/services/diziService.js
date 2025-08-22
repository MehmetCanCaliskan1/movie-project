import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTVShows(endpoint,query='') {
  const res = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      api_key: API_KEY,
      language: 'tr-TR',
      query
    }
  });
  return res.data.results;
}

export default function popularTVShows() {
  return fetchTVShows('/tv/popular');
}

export function topRatedTVShows() {
  return fetchTVShows('/tv/top_rated');
}

export function onTheAirTVShows() {
  return fetchTVShows('/tv/on_the_air');
}

export function airingTodayTVShows() {
  return fetchTVShows('/tv/airing_today');
}

export function searchTVshows(){
  return fetchTVShows('search/tv',query);
}