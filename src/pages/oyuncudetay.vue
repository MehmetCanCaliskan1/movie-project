<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MovieCard from '../components/MovieCard.vue';
const route = useRoute();
const playerId = route.params.id;

const player = ref(null);
const loading = ref(true);
const error = ref(null);
const tvShows = ref([]);
const movies =ref([]);
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchPlayer = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res = await fetch(`https://api.themoviedb.org/3/person/${playerId}?api_key=${apiKey}&language=tr-TR`);
    if (!res.ok) throw new Error('Oyuncu bulunamadı');
    player.value = await res.json();

const tvRes = await fetch(`https://api.themoviedb.org/3/person/${playerId}/tv_credits?api_key=${apiKey}&language=tr-TR`);
    if (!tvRes.ok) throw new Error('Diziler alınamadı');
    const tvData = await tvRes.json();
    tvShows.value = tvData.cast;

    const movieRes = await fetch(`https://api.themoviedb.org/3/person/${playerId}/movie_credits?api_key=${apiKey}&language=tr-TR`);
    if (!movieRes.ok) throw new Error('Filmler alınamadı');
    const movieData = await movieRes.json();
    movies.value = movieData.cast;

    
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchPlayer());
</script>

<template>
  <div v-if="loading">Yükleniyor...</div>
  <div v-else-if="error" class="text-red-500">{{ error }}</div>
  <div v-else class="flex items-start gap-6">
    <!-- Oyuncu Fotoğrafı -->
    <img 
      :src="`https://image.tmdb.org/t/p/w500${player.profile_path}`" 
      alt="Oyuncu Fotoğrafı"
      class="w-50 h-auto rounded"
    >
    <div>
      <h1 class="font-extrabold text-5xl mb-3">{{ player.name }}</h1>
      <p class="font-bold">Doğum Tarihi: {{ player.birthday }}</p>
      <p>Doğum Yeri: {{ player.place_of_birth }}</p>
      <p class="mt-2 text-xl text-bold text-red-500">Biyografi</p>
      <p class="mt-4 text-sm">{{ player.biography }}</p>
    </div>

  </div>


    <div v-if="movies.length">
      <h2 class="text-2xl font-bold mt-6 mb-3">Filmleri</h2>
      <div class="-ml-7 grid grid-cols-2 md:grid-cols-10 gap-7 mr-4">
        <MovieCard 
        v-for="movie in movies.slice(0,10)" :key="movie.id" :movie="movie" 
    class="inline-block w-33 h-80 align-top  text-center ml-5 flex-nowrap"/>
      </div>
    </div>

    <div v-if="tvShows.length">
      <h2 class="text-2xl font-bold mt-6 mb-3">Dizileri</h2>
      <div class="-ml-7 grid grid-cols-2 md:grid-cols-10 gap-7 mr-4">
        <MovieCard v-for="tv in tvShows.slice(0,10)" :key="tv.id" :tvshows="tv" 
    class="inline-block w-33 h-80 align-top  text-center ml-5 flex-nowrap"/>
      </div>
    </div>



  
</template>

