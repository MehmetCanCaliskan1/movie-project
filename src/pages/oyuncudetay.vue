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
  <div v-if="loading" class="text-slate-600">Yükleniyor...</div>
  <div v-else-if="error" class="text-red-600">{{ error }}</div>
  <div v-else class="flex items-start gap-6">
    <!-- Oyuncu Fotoğrafı -->
    <img 
      :src="`https://image.tmdb.org/t/p/w500${player.profile_path}`" 
      alt="Oyuncu Fotoğrafı"
      class="w-50 h-auto rounded shadow-md border border-slate-300"
    >
    <div>
      <h1 class="font-extrabold text-5xl mb-3 text-slate-900">{{ player.name }}</h1>
      <p class="font-bold text-slate-700">Doğum Tarihi: <span class="font-normal">{{ player.birthday }}</span></p>
      <p class="text-slate-700">Doğum Yeri: <span class="font-normal">{{ player.place_of_birth }}</span></p>
      <p class="mt-2 text-xl font-bold text-indigo-600">Biyografi</p>
      <p class="mt-4 text-sm text-slate-800 leading-relaxed">{{ player.biography }}</p>
    </div>
  </div>

  <div v-if="movies.length">
    <h2 class="text-2xl font-bold mt-6 mb-3 text-slate-900">Oynadığı Filmler</h2>
    <div class="flex overflow-x-auto space-x-5 ml-2 pb-3">
      <MovieCard 
        v-for="movie in movies.slice(0,30)" 
        :key="movie.id" 
        :movie="movie" 
        class="w-33 h-85 flex-shrink-0 text-center bg-white border border-slate-200 shadow-sm hover:shadow-md"
      />
    </div>
  </div>

  <div v-if="tvShows.length">
    <h2 class="text-2xl font-bold mt-6 mb-3 text-slate-900">Oynadığı Diziler</h2>
    <div class="flex overflow-x-auto space-x-5 ml-2 pb-3">
      <MovieCard 
        v-for="tv in tvShows.slice(0,30)" 
        :key="tv.id" 
        :tvshows="tv" 
        class="w-33 h-85 flex-shrink-0 text-center bg-white border border-slate-200 shadow-sm hover:shadow-md"
      />
    </div>
  </div>
</template>


