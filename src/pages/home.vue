<template>
  <div class="ml-4 -mt-5 relative w-full">
    <div class="flex items-center bg-white rounded px-3 py-2">
      <MagnifyingGlassIcon class="w-7 h-7 text-black-500 mr-2 font-extrabold" />
      <input 
        type="text" 
        v-model="query"
        class="border-none outline-none focus:ring-0 flex-1 text-black" 
        placeholder="Film veya Dizi Ara..."
        id="search"
      />
    </div>

    <div
      v-if=" query.length >= 3"
      class="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-1 max-h-84 min-w-360 overflow-auto z-50 -ml-3.5"
    >
      <ul class="divide-y">
        <li
          v-for="movie in movieresults"
          :key="'movie-'+movie.id"
          class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="$router.push(`/pages/detay/movie/${movie.id}`)"
        >
        >
          <span class="text-gray-500">🎞️</span>
          <span>{{ movie.title }}</span>
          <span class="ml-auto text-gray-400 text-sm">Filmlerde</span>
        </li>

        <li
          v-for="tv in tvresults"
          :key="'tv-'+tv.id"
          class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="$router.push(`/pages/detay/tv/${tv.id}`)"
        >
          <span class="text-gray-500">🖥️</span>
          <span>{{ tv.name }}</span>
          <span class="ml-auto text-gray-400 text-sm">Dizilerde</span>
        </li>

        <li v-if="loading" class="p-2 text-center text-gray-500">Yükleniyor...</li>
       <li v-else-if="!movieresults.length && !tvresults.length && !loading" class="p-2 text-center text-gray-500">Sonuç Bulunamadı</li>
      </ul>
    </div>


  </div>
  <div
    class="bg-gray-900 text-white font-extrabold p-8 text-center mt-1 mb-8"
    style="background-image: url(''); background-size: cover; background-position: center;"
  >
    <h1 class="text-7xl font-extrabold mb-5 mt-10">Hoş Geldiniz!</h1>
    <p class="mb-12 text-lg">
      CineScope, en yeni ve popüler filmleri keşfetmenizi sağlar. Şimdi Keşfedin
    </p>
    <SearchBar />
  </div>

  <span class="font-bold text-3xl text-black ml-5">Ana Akım
<div class="inline-flex border border-blue-800 rounded-full overflow-hidden text-lg font-bold text-blue-900 ml-4" >
    <button
      @click="selected = 'today'"
      :class="[
        'px-6 py-2 font-bold transition',
        selected === 'today'
          ? 'bg-blue-900 text-blue-300'
          : 'bg-white text-blue-900'
      ]"
    >
      Bugün
    </button>

    <button
      @click="selected = 'week'"
      :class="[
        'px-6 py-2 font-bold transition',
        selected === 'week'
          ? 'bg-blue-900 text-blue-300'
          : 'bg-white text-blue-900'
      ]"
    >
      Bu Hafta
    </button>
  </div>  </span>

  <div class="flex gap-4 overflow-x-auto break-words py-4">
<div  class="flex gap-1 justify-center">
  <MovieCard
    v-for="movie in movies.slice(0, 20) || []"
    :key="movie.id"
    :movie="movie"
    class="inline-block w-33 h-87 align-top flex-shrink-0 text-center ml-5 "
  />
</div>


</div>



</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted } from 'vue';
import popular, { upcoming } from '../services/movieService.js';
import SearchBar from '../components/SearchBar.vue';
import MovieCard from '../components/MovieCard.vue';
import {  watch } from 'vue';
const selected = ref('today');

const query = ref('');
const movieresults = ref([]);
const tvresults = ref([]);
const loading = ref(false);
let timeout = null;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
watch(query, (newValue) => {
  clearTimeout(timeout);

  if (newValue.length < 3) {
    movieresults.value = [];
    tvresults.value = [];
    return;
  }

  timeout = setTimeout(async () => {
          loading.value = true;

    try {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(newValue)}`
      );
      const movieData = await movieRes.json();
      movieresults.value = movieData.results || [];

      // Dizi araması
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(newValue)}`
      );
      const tvData = await tvRes.json();
      tvresults.value = tvData.results || [];

      


    } catch (err) {
      console.error("Search error:", err);
    } finally {
      loading.value = false;
    }
  }, 500); // 
});


const movies = ref([]);
const loading2 = ref(true);
const loadMovies = async () => {
  loading2.value = true;
  try {
    if (selected.value === 'today') {
      movies.value = await popular();
    } else if (selected.value === 'week') {
      movies.value = await upcoming();
    }
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading2.value = false;
  }
};
onMounted(loadMovies);
watch(selected, loadMovies);
</script>
