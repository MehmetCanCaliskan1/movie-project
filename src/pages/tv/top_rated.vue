 <script setup>
import { ref, onMounted } from 'vue';

import { topRatedTVShows } from '../../services/diziService.js';
import MovieCard from '../../components/MovieCard.vue';
const tvshows = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    tvshows.value = await topRatedTVShows();
  } catch (err) {
    console.error('Dizi verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">Yükleniyor...</div>
  <div v-else class="grid grid-cols-5 gap-6 ml-83 mr-20">
    <MovieCard v-for="tvshow in tvshows || []" :key="tvshow.id" :tvshows="tvshow" />
  </div>
</template>
