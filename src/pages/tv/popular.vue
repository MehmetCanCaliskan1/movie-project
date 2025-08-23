 <script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import popularTvShows from '../../services/diziService.js';
import MovieCard from '../../components/MovieCard.vue';

const originaltvshows = ref([]);
const tvshows =ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    originaltvshows.value = await popularTvShows();
    tvshows.value=[...originaltvshows.value];
  } catch (err) {
    console.error('Dizi verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});

const applySort=(sort)=>{
    switch(sort) {
    case 'Popülerliğe Göre Azalan':
    tvshows.value.sort((a, b) => b.popularity - a.popularity);
    break;
    case 'Popülerliğe Göre Artan':
    tvshows.value.sort((a, b) => a.popularity - b.popularity);
        break;

    case 'En Yeni':
    tvshows.value.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
        break;

    case 'En Eski':
    tvshows.value.sort((a, b) => new Date(a.first_air_date) - new Date(b.first_air_date));
        break;

    case 'En Yüksek Oy Alan':
    tvshows.value.sort((a, b) => b.vote_average - a.vote_average);
        break;

    case 'En Düşük Oy Alan':
    tvshows.value.sort((a, b) => a.vote_average - b.vote_average);
        break;

  }
};
const applyFilter = (filters) => {
  tvshows.value = originaltvshows.value.filter(tvshows => {
    if (filters.action && tvshows.genre_ids.includes(28)) return true;
    if (filters.drama && tvshows.genre_ids.includes(18)) return true;
    if (filters.comedy && tvshows.genre_ids.includes(35)) return true;
    return !filters.action && !filters.drama && !filters.comedy; 
  });
};
</script>
<template>
  <div class="flex min-h-screen">

    <Sidebar title="Popüler Diziler" 
    @sort-changed="applySort"
    @filter-changed="applyFilter"
    />

    <div class="flex-1 p-6 grid grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="tvshow in tvshows || []" :key="tvshow.id" :tvshows="tvshow" />
    </div>
  </div>
</template>