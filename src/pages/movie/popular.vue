 <script setup>
import { ref, onMounted } from 'vue';

import Sidebar from '../../components/Sidebar.vue';
import popular  from '../../services/movieService.js';
import MovieCard from '../../components/MovieCard.vue';

const loading = ref(true);

const originalMovies = ref([]); 
const movies = ref([]); 

onMounted(async () => {
  try {
    originalMovies.value = await popular();
    movies.value = [...originalMovies.value];
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
});

const applySort = (sort) => {
  if (sort === 'Popülerliğe Göre Azalan') {
    movies.value.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === 'Popülerliğe Göre Artan') {
    movies.value.sort((a, b) => a.popularity - b.popularity);
  } else if (sort === 'En Yeni') {
    movies.value.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (sort === 'En Eski') {
    movies.value.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } else if (sort === 'En Yüksek Oy Alan') {
    movies.value.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sort === 'En Düşük Oy Alan') {
    movies.value.sort((a, b) => a.vote_average - b.vote_average);
  }
};

const applyFilter = (filters) => {
  movies.value = originalMovies.value.filter(movie => {
    if (filters.action && movie.genre_ids.includes(28)) return true;
    if (filters.drama && movie.genre_ids.includes(18)) return true;
    if (filters.comedy && movie.genre_ids.includes(35)) return true;
    return !filters.action && !filters.drama && !filters.comedy; // hiçbir filtre seçilmemişse tümünü göster
  });
};
</script>


<template>
  <div class="flex min-h-screen">

<Sidebar 
  title="Popüler Filmler" 
  @sort-changed="applySort" 
  @filter-changed="applyFilter"
/>
    <div class="flex-1 p-6 grid grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="movie in movies || []" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
