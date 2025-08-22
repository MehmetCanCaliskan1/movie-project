
<script setup>
import { defineProps, computed } from 'vue';
/* import { useFavoritesStore } from '../favori/favourite.js';
 */
const props = defineProps({
  movie: {
    type: Object,
    required: false,
  },
  tvshows: {
    type: Object,
    required: false,
  }
});
/* const favoritesStore = useFavoritesStore();
function toggleFavourite() {
  favoritesStore.toggle(props.movie || props.tvshows);
}
 */
const posterUrl = computed(() => {
  const posterPath = props.movie?.poster_path || props.tvshows?.poster_path;
  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
});

const title = computed(() => props.movie?.title || props.tvshows?.name);
const rating = computed(() => props.movie?.vote_average || props.tvshows?.vote_average);



 </script>

<template>
  <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
  @click="$router.push(`/pages/detay/${props.movie ? 'movie' : 'tv'}/${props.movie?.id || props.tvshows?.id}`)">

    <img :src="posterUrl" alt="Poster" class="w-full">
    <div class="p-4">
      <h2 class="text-md font-bold text-white mb-2 text-center ">{{ title }}</h2>
      <p class="text-gray-400 text-center">Rating: {{ rating?.toFixed(1) ?? 'N/A'}}</p>
<!--        <p class="text-gray-400 text-center">{{ release_date }}</p>
 -->   </div>
  
  </div>
</template>


