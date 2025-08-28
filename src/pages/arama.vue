<script setup >
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {searchMovies}  from '../services/movieService.js';
import MovieCard from '../components/MovieCard.vue';
import { searchTVShows } from '../services/diziService.js';
const route = useRoute();
const movies = ref([]);
const tvshows= ref([]);
const movieloading = ref(false);
const tvloading=ref(false);
const movierror = ref('');
const tverror = ref('');

const fetchMovies = async (query) => {
  movieloading.value = true;
  movierror.value = '';
  try {
    movies.value = await searchMovies(query);
    
  } catch (err) {
    movierror.value = 'Film araması sırasında hata oluştu.';
    movies.value = [];
    console.error(err);
  } finally {
    movieloading.value = false;
  }
};

const fetchTVShows = async (query) => {
  tvloading.value = true;
  tverror.value = '';
  try {
    tvshows.value = await searchTVShows(query);
    
  } catch (err) {
    tverror.value = 'Dizi araması sırasında hata oluştu.';
    tvshows.value = [];
    console.error(err);
  } finally {
    tvloading.value = false;
  }
};


watch(
  () => route.query.q,
  (newQuery) => {
    if (typeof newQuery === 'string' && newQuery.trim() !== '') {
      fetchMovies(newQuery );
      fetchTVShows(newQuery );

    } else {
      movies.value = [];
      tvshows.value=[];
      tvloading.value = false;
      movieloading.value=false;
    }
  },
  { immediate: true }
);


</script>

<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-4">Arama Sonuçları:{{ route.query.q || '' }}</h2>

    <div v-if="movieloading||tvloading" class="text-gray-500">Yükleniyor...</div>
    <div v-else-if="movierror" class="text-red-500 text-xl">{{ movierror }}</div>
    <div v-else-if="tverror" class="text-red-500 text-xl">{{ tverror }}</div>
    <div v-else>
      <div v-if="movies.length === 0" class="text-red-500 text-3xl">Hiç sonuç bulunamadı.</div>
      <div class="grid grid-cols-2 md:grid-cols-10 gap-8">
        
        <MovieCard v-for="tvshow in tvshows ||[]" :key="tvshow.id" :tvshows="tvshow" />
        <MovieCard v-for="movie in movies||[]" :key="movie.id" :movie="movie" />

      </div>
    </div>
  </div>
</template>


<!-- <script setup >
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import {searchMovies}  from '../services/movieService.js';
import MovieCard from '../components/MovieCard.vue';
import { searchTVShows } from '../services/diziService.js';

const route = useRoute();
const movies = ref([]);
const tvshows= ref([]);
const movieloading = ref(false);
const tvloading=ref(false);
const movierror = ref('');
const tverror = ref('');

const fetchMovies = async (query) => {
  movieloading.value = true;
  movierror.value = '';
  try {
    movies.value = await searchMovies(query);
  } catch (err) {
    movierror.value = 'Arama sırasında hata oluştu.';
    movies.value = [];
    console.error(err);
  } finally {
    movieloading.value = false;
  }
};

const fetchTVShows = async (query) => {
  tvloading.value = true;
  tverror.value = '';
  try {
    tvshows.value = await searchTVShows(query);
  } catch (err) {
    tverror.value = 'Arama sırasında hata oluştu.';
    tvshows.value = [];
    console.error(err);
  } finally {
    tvloading.value = false;
  }
};

const combinedResults = computed(() => {
  const all = [
    ...movies.value.map(m => ({ ...m, type: 'movie' })),
    ...tvshows.value.map(t => ({ ...t, type: 'tv' }))
  ];
  return all.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
});

watch(
  () => route.query.q,
  (newQuery) => {
    if (typeof newQuery === 'string' && newQuery.trim() !== '') {
      fetchMovies(newQuery);
      fetchTVShows(newQuery);
    } else {
      movies.value = [];
      tvshows.value=[];
      tvloading.value = false;
      movieloading.value=false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Arama Sonuçları: {{ route.query.q || '' }}</h2>

    <div v-if="movieloading || tvloading" class="text-gray-500">Yükleniyor...</div>
    <div v-else-if="movierror" class="text-red-500">{{ movierror }}</div>
    <div v-else-if="tverror" class="text-red-500">{{ tverror }}</div>
    <div v-else>
      <div v-if="combinedResults.length === 0" class="text-gray-500">Hiç sonuç bulunamadı.</div>
      <div class="grid grid-cols-2 md:grid-cols-10 gap-8">
        <MovieCard 
          v-for="item in combinedResults" 
          :key="item.id + '-' + item.type" 
          :movie="item.type === 'movie' ? item : null" 
          :tvshows="item.type === 'tv' ? item : null" 
        />
      </div>
    </div>
  </div>
</template>


    -->