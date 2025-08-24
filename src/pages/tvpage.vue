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
  const filtered = originaltvshows.value.filter(tv => {
    if (filters['action-adventure'] && tv.genre_ids.includes(10759)) return true;
    if (filters.animation && tv.genre_ids.includes(16)) return true;
    if (filters.comedy && tv.genre_ids.includes(35)) return true;
    if (filters.crime && tv.genre_ids.includes(80)) return true;
    if (filters.documentary && tv.genre_ids.includes(99)) return true;
    if (filters.drama && tv.genre_ids.includes(18)) return true;
    if (filters.family && tv.genre_ids.includes(10751)) return true;
    if (filters.kids && tv.genre_ids.includes(10762)) return true;
    if (filters.mystery && tv.genre_ids.includes(9648)) return true;
    if (filters.news && tv.genre_ids.includes(10763)) return true;
    if (filters.reality && tv.genre_ids.includes(10764)) return true;
    if (filters['sci-fantasy'] && tv.genre_ids.includes(10765)) return true;
    if (filters.soap && tv.genre_ids.includes(10766)) return true;
    if (filters.talk && tv.genre_ids.includes(10767)) return true;
    if (filters['war-politics'] && tv.genre_ids.includes(10768)) return true;
    if (filters.western && tv.genre_ids.includes(37)) return true;

    // Eğer hiçbir filtre seçili değilse tümünü göster
    return !filters['action-adventure'] &&
           !filters.animation &&
           !filters.comedy &&
           !filters.crime &&
           !filters.documentary &&
           !filters.drama &&
           !filters.family &&
           !filters.kids &&
           !filters.mystery &&
           !filters.news &&
           !filters.reality &&
           !filters['sci-fantasy'] &&
           !filters.soap &&
           !filters.talk &&
           !filters['war-politics'] &&
           !filters.western;
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
