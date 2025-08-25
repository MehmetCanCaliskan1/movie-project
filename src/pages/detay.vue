<script setup>
import { ref, onMounted,watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useFavoritesStore } from '../favori/favourite.js';
import SearchBar1 from '../components/SearchBar1.vue';
const route = useRoute();
const item = ref(null); // movie veya tv
const loading = ref(true);
const error = ref(null);

const cast = ref([]); 

const favoritesStore = useFavoritesStore();
function toggleFav() {
  if (item.value) {
    favoritesStore.toggleFavorite(item.value, route.params.type);
  }
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function loadData() {
  const type = route.params.type;
  loading.value = true;
  error.value = null;

  try {
    const res = await axios.get(`${BASE_URL}/${type}/${route.params.id}`, {
      params: {
        api_key: API_KEY,
        language: 'tr-TR'
      }
    });
    item.value = res.data;

    const creditsRes = await axios.get(`${BASE_URL}/${type}/${route.params.id}/credits`, {
      params: { api_key: API_KEY, language: 'tr-TR' }
    });
    cast.value = creditsRes.data.cast;
  } catch (err) {
    error.value = 'Detaylar alınamadı.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

watch(() => route.params.id, () => {
  loadData();
});

watch(
  () => [route.params.type, route.params.id],
  () => {
    loadData();
  }
);


const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString(); 
}
</script>


<template>
 <SearchBar1 class="mb-1"/>
  <div class="max-w-5xl mx-auto p-6 text-white bg-[#1a1a1a]">
    <!-- Yükleniyor / Hata -->
    <div v-if="loading" class="text-center">Yükleniyor...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else>
    <!--   Arka plan
      div
        class="w-full sm:h-72 md:h-96 bg-cover bg-center rounded-lg shadow-lg relative"
        :style="{
          backgroundImage: item.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            : 'url(/placeholder.jpg)'
        }"
      > -->
       

      <!-- İçerik -->
      <div class="mt-6 flex flex-col md:flex-row gap-6">
        <!-- Poster -->
        <img
          :src="item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : '/placeholder.jpg'"
          alt="Poster"
          class="w-64 rounded-lg shadow-lg"
        />

        <!-- Detaylar -->
        <div class="flex-1">
          <h1 class="text-4xl font-extrabold">{{ item.title || item.name }}</h1>
          <p class="italic text-gray-400 mb-2">{{ item.tagline || '' }}</p>
          <p class="mb-4">{{ item.overview }}</p>

          <!-- Rating, Release, Runtime -->
          <div class="flex gap-4 mb-4 flex-wrap">
            <span
              class="bg-yellow-500 text-black px-2 py-1 rounded"
              v-if="item.vote_average"
            >
              ⭐ {{ item.vote_average.toFixed(1) }}
            </span>
             <span>{{ formatDate(item.release_date || item.first_air_date) }}</span>
            <span>
              ⏱
              {{ item.runtime || (item.episode_run_time?.[0] ?? '-') }} dk
            </span>
           <span v-if="item.adult">18+</span>
          </div>
          <!-- </div> -->
          <!-- Türler -->
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="genre in item.genres || []"
              :key="genre.id"
              class="bg-gray-700 px-3 py-1 rounded-full"
            >
              {{ genre.name }}
            </span>
          </div>
          
        </div>
      </div>
      
    
    <div class="mt-8">
  <div class="text-2xl font-bold mb-4 flex justify-between items-center">
  <span>Öne Çıkan Oyuncular</span>

  <div class="flex items-center space-x-2">
    <span>Favorilere Ekle</span>
    <button
    onclick="window.alert('Favori Durumunuz Değiştirildi')"
      @click="toggleFav"
      class="text-3xl transition"
      :class="favoritesStore.isFavorite(item.id, route.params.type) ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'"
    >
      ★
    </button>
  </div>
</div>

  <div class="flex gap-4 overflow-x-auto pb-2">
    <div
  v-for="actor in [...cast].sort((a, b) => (b.profile_path ? 1 : 0) - (a.profile_path ? 1 : 0)).slice(0, 20)" 
  :key="actor.id"
  class="flex-shrink-0 w-32 text-center cursor-pointer"
  @click="$router.push(`/pages/oyuncudetay/${actor.id}`)"
>
  <img
    :src="actor.profile_path 
      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
      : '/placeholder.jpg'"
    alt="Oyuncu"
    class="w-32 h-48 object-cover rounded-lg shadow"
  />
  <p class="mt-2 text-sm font-semibold">{{ actor.name }}</p>
  <p class="text-xs text-gray-400">({{ actor.character }})</p>
</div>

  </div>
</div>
</div>
  </div>
</template>
<style scoped>
body {
  background-color: #1a1a1a;
}
</style>
