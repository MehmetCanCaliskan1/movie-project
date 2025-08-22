<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {searchMovies}  from '../services/movieService.js';
import MovieCard from '../components/MovieCard.vue';
import { searchTVshows } from '../services/diziService.js';
const route = useRoute();
const movies = ref([]);
const tvshows= ref([]);
const movieloading = ref(false);
const tvloading=ref(false);
const movierror = ref('');
const tverror = ref('');

const fetchMovies = async (query: string) => {
  movieloading.value = true;
  movierror.value = '';
  try {
    movies.value = await searchMovies(query);
    
  } catch (err: any) {
    error.value = 'Arama sırasında hata oluştu.';
    movies.value = [];
    console.error(err);
  } finally {
    movieloading.value = false;
  }
};

const fetchTVShows = async (query: string) => {
  tvloading.value = true;
  tverror.value = '';
  try {
    tvshows.value = await searchTVshows(query);
    
  } catch (err: any) {
    error.value = 'Arama sırasında hata oluştu.';
    tvshows.value = [];
    console.error(err);
  } finally {
    tvloading.value = false;
  }
};



// Query değişirse aramayı tetikle
watch(
  () => route.query.q,
  (newQuery) => {
    if (typeof newQuery === 'string' && newQuery.trim() !== '') {
      fetchMovies(newQuery as string);
      fetchTVShows(newQuery as string);

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
    <h2 class="text-xl font-bold mb-4">Arama Sonuçları:{{ route.query.q || '' }}</h2>

    <div v-if="loading" class="text-gray-500">Yükleniyor...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-if="movies.length === 0" class="text-gray-500">Hiç sonuç bulunamadı.</div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <MovieCard v-for="movie in movies||tvshow in tvshows" :key="movie.id||tvshow.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>



<!-- 
v-for="movie in popularMovies.slice(0,20) || tvshow in popularTVShows.slice(0,20)|| []"
        :key="movie.id || tvshow.id"
        :movie="movie" -->