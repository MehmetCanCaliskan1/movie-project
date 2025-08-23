<script setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import MovieCard from '../components/MovieCard.vue';

const props = defineProps({
  title: { type: String, required: true },
  movieService: { type: Function, required: true }
});

const loading = ref(true);
const originalMovies = ref([]);
const movies = ref([]);

const loadMovies = async () => {
  loading.value = true;
  try {
    originalMovies.value = await props.movieService();
    movies.value = [...originalMovies.value];
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => loadMovies());

watch(
  () => props.movieService,
  () => {
    loadMovies();
  }
);
watch(
  () => props.title,
  () => {
    loadMovies();
  }
);

const applySort = (sort) => {
  let sorted = [...movies.value];
  if (sort === 'Popülerliğe Göre Azalan') sorted.sort((a, b) => b.popularity - a.popularity);
  else if (sort === 'Popülerliğe Göre Artan') sorted.sort((a, b) => a.popularity - b.popularity);
  else if (sort === 'En Yeni') sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  else if (sort === 'En Eski') sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  else if (sort === 'En Yüksek Oy Alan') sorted.sort((a, b) => b.vote_average - a.vote_average);
  else if (sort === 'En Düşük Oy Alan') sorted.sort((a, b) => a.vote_average - b.vote_average);

  movies.value = [...sorted];
};

const applyFilter = (filters) => {
  const filtered = originalMovies.value.filter(movie => {
    if (filters.action && movie.genre_ids.includes(28)) return true;
    if (filters.drama && movie.genre_ids.includes(18)) return true;
    if (filters.comedy && movie.genre_ids.includes(35)) return true;
    return !filters.action && !filters.drama && !filters.comedy;
  });
  movies.value = [...filtered];
};
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar 
      :title="props.title"
      @sort-changed="applySort"
      @filter-changed="applyFilter"
    />
    <div class="flex-1 p-6 grid grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="movie in movies || []" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
