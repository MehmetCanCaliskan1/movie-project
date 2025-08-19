 <script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import { onTheAirTVShows } from '../../services/diziService.js';
import MovieCard from '../../components/MovieCard.vue';
const tvshows = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    tvshows.value = await onTheAirTVShows();
  } catch (err) {
    console.error('Dizi verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex min-h-screen">

    <Sidebar title="Bugün Başlayan Diziler" />

    <div class="flex-1 p-6 grid grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="tvshow in tvshows || []" :key="tvshow.id" :tvshows="tvshow" />
    </div>
  </div>
</template>