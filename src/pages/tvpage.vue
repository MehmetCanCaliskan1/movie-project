<script setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import MovieCard from '../components/MovieCard.vue';

const props = defineProps({
  name: { type: String, required: true },
  diziService: { type: Function, required: true }
});

const loading = ref(true);
const originaltvshows = ref([]);
const tvshows = ref([]);

const loadTvShows = async () => {
  loading.value = true;  
  try {
    originaltvshows.value = await props.diziService();
    tvshows.value = [...originaltvshows.value];
  } catch (err) {
    console.error('Dizi verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => loadTvShows());

watch(
  () => props.diziService,
  () => {
    loadTvShows();
  }
);
watch(
  () => props.name,
  () => {
    loadTvShows();
  }
);

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
  const filtered = originaltvshows.value.filter(tvshows => {
    if (filters.action && tvshows.genre_ids.includes(28)) return true;
    if (filters.drama && tvshows.genre_ids.includes(18)) return true;
    if (filters.comedy && tvshows.genre_ids.includes(35)) return true;
    return !filters.action && !filters.drama && !filters.comedy;
  });
  tvshows.value = [...filtered];
};
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar 
      :title="props.name"
      @sort-changed="applySort"
      @filter-changed="applyFilter"
    />
<div class="flex-1 p-6 grid grid-cols-3 md:grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="tvshow in tvshows || []" :key="tvshow.id" :tvshows="tvshow" />
    </div>
  </div>
</template>
