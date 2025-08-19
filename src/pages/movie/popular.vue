 <script setup>
import { ref, onMounted } from 'vue';

import Sidebar from '../../components/Sidebar.vue';
import popular  from '../../services/movieService.js';
import MovieCard from '../../components/MovieCard.vue';
const movies = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    movies.value = await popular();
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});


</script>


<template>
  <div class="flex min-h-screen">

    <Sidebar title="Popüler Filmler" />

    <div class="flex-1 p-6 grid grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="movie in movies || []" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
