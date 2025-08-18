<script setup>
import { ref, onMounted } from 'vue';

import { topRated } from '../../services/movieService.js';
import MovieCard from '../../components/MovieCard.vue';
const movies = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    movies.value = await topRated();
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">Yükleniyor...</div>
  <div v-else class="grid grid-cols-5 gap-6 ml-83 mr-20">
<MovieCard v-for="movie in movies || []" :key="movie.id" :movie="movie" />
  </div>
</template>
