<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { searchTVShows } from '../services/diziService.js'; 
import { searchMovies } from '../services/movieService.js'; 

const query = ref('');
const movieresults = ref([]);
const tvresults = ref([]);
const loading = ref(false);
const showDropdown = ref(false);

const router = useRouter();

watch(query, async (newVal) => {
  if (newVal.length < 3) {
    movieresults.value = [];
    tvresults.value = [];
    showDropdown.value = false;
    return;
  }

  loading.value = true;
  showDropdown.value = true;

  try {
    const movies = await searchMovies(newVal);
    const tvs = await searchTVShows(newVal);

    movieresults.value = movies;
    tvresults.value = tvs;
  } catch (err) {
    console.error(err);
    movieresults.value = [];
    tvresults.value = [];
  } finally {
    loading.value = false;
  }
});

const searchRef = ref(null);

const handleClickOutside = (e) => {
  if (searchRef.value && !searchRef.value.contains(e.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleSelect = (path) => {
  showDropdown.value = false;
  router.push(path);
};

</script>

<template>
  <div ref="searchRef" class="ml-4 -mt-5 relative w-full sticky top-0">
    <div class="flex items-center bg-white rounded px-3 py-2">
      <MagnifyingGlassIcon class="w-7 h-7 text-black-500 mr-2 font-extrabold" />
      <input 
        type="text" 
        v-model="query"
        class="border-none outline-none focus:ring-0 flex-1 text-black" 
        placeholder="Film veya Dizi Ara..."
        id="search"
      />
    </div>

    <div
      v-if="showDropdown && query.length >= 3"
      class="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-1 max-h-84 min-w-360 overflow-auto z-50 -ml-3.5"
    >
      <ul class="divide-y">
        <li
          v-for="movie in movieresults.slice(0,7)"
          :key="'movie-'+movie.id"
          class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="handleSelect(`/pages/detay/movie/${movie.id}`)"

        >
          <span class="text-gray-500">🎞️</span>
          <span>{{ movie.title }}</span>
          <span class="ml-auto text-gray-400 text-sm">Filmlerde</span>
        </li>

        <li
          v-for="tv in tvresults.slice(0,7)"
          :key="'tv-'+tv.id"
          class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="handleSelect(`/pages/detay/tv/${tv.id}`)"
        >
          <span class="text-gray-500">🖥️</span>
          <span>{{ tv.name }}</span>
          <span class="ml-auto text-gray-400 text-sm">Dizilerde</span>
        </li>

        <li v-if="loading" class="p-2 text-center text-gray-500">Yükleniyor...</li>
        <li v-else-if="!movieresults.length && !tvresults.length && !loading" class="p-2 text-center text-gray-500">Sonuç Bulunamadı</li>
      </ul>
    </div>
  </div>
</template>
