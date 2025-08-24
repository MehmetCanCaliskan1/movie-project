<template>
   <SearchBar1 />

  <div class="bg-gray-900 text-white font-extrabold p-8 text-center mt-1 mb-8"
       style="background-image: url(''); background-size: cover; background-position: center;">
    <h1 class="text-7xl font-extrabold mb-5 mt-10">Hoş Geldiniz!</h1>
    <p class="mb-12 text-lg">
      CineScope, en yeni ve popüler filmleri keşfetmenizi sağlar. Şimdi Keşfedin
    </p>
    <SearchBar2 />
  </div>

  <div class="ml-5 mb-4">
    <span class="font-bold text-3xl text-black">Ana Akım</span>
    <div class="inline-flex border border-blue-800 rounded-full overflow-hidden text-lg font-bold text-blue-900 ml-4">
      <button
            class="cursor-pointer"

        @click="mainSelected = 'today'"
        :class="buttonClass(mainSelected, 'today'),[ mainSelected === 'today' ? 'bg-blue-900 text-blue-300' : 'bg-white text-blue-900' ]"
      >Bugün</button>
      <button
        @click="mainSelected = 'week'"
              class="cursor-pointer"

        :class="buttonClass(mainSelected, 'week'),[ mainSelected === 'week' ? 'bg-blue-900 text-blue-300' : 'bg-white text-blue-900' ]"
      >Bu Hafta</button>
    </div>
  </div>

  <div class="flex gap-4 overflow-x-auto break-words py-4 mb-8">
    <div class="flex gap-1 justify-center">
      <MovieCard
        v-for="movie in mainMovies.slice(0,20) || []"
        :key="movie.id"
        :movie="movie"
        class="inline-block w-33 h-87 align-top flex-shrink-0 text-center ml-5"
      />
    </div>
  </div>

  <div class="ml-5 mb-4 ">
    <span class="font-bold text-3xl text-black">Yüksek Oy Alan</span>
    <div class="inline-flex border border-blue-800 rounded-full overflow-hidden text-lg font-bold text-blue-900 ml-4">
      <button
      class="cursor-pointer"
        @click="popularSelected = 'Filmler'"
        :class="buttonClass(popularSelected, 'Filmler') ,[ popularSelected === 'Filmler' ? 'bg-blue-900 text-blue-300' : 'bg-white text-blue-900' ]"
      >Filmler</button>
      <button
        @click="popularSelected = 'Diziler'"
        :class="buttonClass(popularSelected, 'Diziler'), [ popularSelected === 'Diziler' ? 'bg-blue-900 text-blue-300' : 'bg-white text-blue-900' ]"
              class="cursor-pointer"

      >Diziler</button>
    </div>
  </div>

  <div class="flex gap-4 overflow-x-auto break-words py-4">
    <div class="flex gap-1 justify-center">
  <!-- Filmler -->
  <MovieCard
    v-for="movie in popularMovies.slice(0,20)||[]"
    :key="movie.id"
    :movie="movie"
    class="inline-block w-33 h-87 align-top flex-shrink-0 text-center ml-5"
  />

  <!-- Diziler -->
  <MovieCard
    v-for="tvshow in popularTVShows.slice(0,20)||[]"
    :key="tvshow.id"
    :tvshows="tvshow"
    class="inline-block w-33 h-87 align-top flex-shrink-0 text-center ml-5"
  />
</div>

  </div>

</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { ref, watch, onMounted } from 'vue';
import {topRated,trendingToday,trendingWeek } from '../services/movieService.js';
import { topRatedTVShows } from '../services/diziService.js';
import SearchBar2 from '../components/SearchBar2.vue';
import MovieCard from '../components/MovieCard.vue';
import SearchBar1  from '../components/SearchBar1.vue';

const query = ref('');
const movieresults = ref([]);
const tvresults = ref([]);
const loading = ref(false);
let timeout = null;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

watch(query, (newValue) => {
  clearTimeout(timeout);
  if(newValue.length < 3){
    movieresults.value = [];
    tvresults.value = [];
    return;
  }
  timeout = setTimeout(async ()=>{
    loading.value = true;
    try{
      const movieRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(newValue)}`);
      movieresults.value = (await movieRes.json()).results || [];
      const tvRes = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(newValue)}`);
      tvresults.value = (await tvRes.json()).results || [];
    }catch(err){
      console.error("Search error:", err);
    }finally{
      loading.value = false;
    }
  },500)
})

const mainSelected = ref('today');
const popularSelected = ref('Filmler');

const mainMovies = ref([]);
const popularMovies = ref([]);
const popularTVShows = ref([]);
const loadMainMovies = async () => {
  if(mainSelected.value === 'today') mainMovies.value = await trendingToday();
  else if(mainSelected.value === 'week') mainMovies.value = await trendingWeek();
};


const loadPopularMovies = async () => {
  if (popularSelected.value === 'Filmler') {
    popularMovies.value = await topRated();
    popularTVShows.value = [];
  } else if (popularSelected.value === 'Diziler') {
    popularTVShows.value = await topRatedTVShows();
    popularMovies.value = [];
  }
};

watch(mainSelected, loadMainMovies);
watch(popularSelected, loadPopularMovies);
onMounted(()=>{
  loadMainMovies();
  loadPopularMovies();
});

const buttonClass = (selectedRef, value) => [
  'px-6 py-2 font-bold transition',
  selectedRef.value === value
   
];
</script>
