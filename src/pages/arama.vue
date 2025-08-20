<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {searchMovies}  from '../services/movieService.js';
import MovieCard from '../components/MovieCard.vue';

const route = useRoute();
const movies = ref([]);
const loading = ref(true);
const error = ref('');

const fetchMovies = async (query: string) => {
  loading.value = true;
  error.value = '';
  try {
    movies.value = await searchMovies(query);
  } catch (err: any) {
    error.value = 'Arama sırasında hata oluştu.';
    movies.value = [];
    console.error(err);
  } finally {
    loading.value = false;
  }
};


// Query değişirse aramayı tetikle
watch(
  () => route.query.q,
  (newQuery) => {
    if (typeof newQuery === 'string' && newQuery.trim() !== '') {
      fetchMovies(newQuery as string);
    } else {
      movies.value = [];
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Arama Sonuçları: "{{ route.query.q || '' }}"</h2>

    <div v-if="loading" class="text-gray-500">Yükleniyor...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-if="movies.length === 0" class="text-gray-500">Hiç sonuç bulunamadı.</div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>




