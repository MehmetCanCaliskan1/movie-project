<!-- <template>
  <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
    <img :src="posterUrl.value" alt="Movie Poster" class="w-full">
    <div class="p-4">
      <h2 class="text-xl font-bold text-white mb-2">{{ title }}</h2>
      <p class="text-gray-400">Rating: {{ vote_average }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: Array,
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number
});

const posterUrl = computed(() => {
  return props.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
});
</script>
 -->



<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: false
  },
  tvshows: {
    type: Object,
    required: false
  }
});

const posterUrl = computed(() => {
  const posterPath = props.movie?.poster_path || props.tvshows?.poster_path;
  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
});

const title = computed(() => props.movie?.title || props.tvshows?.name);
const rating = computed(() => props.movie?.vote_average || props.tvshows?.vote_average);
/* const release_date = computed(() => props.movie?.release_date || props.tvshows?.first_air_date);
 */</script>

<template>
  <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
  @click="$router.push(`/pages/detay/${props.movie ? 'movie' : 'tv'}/${props.movie?.id || props.tvshows?.id}`)">

    <img :src="posterUrl" alt="Poster" class="w-full">
    <div class="p-4">
      <h2 class="text-xl font-bold text-white mb-2">{{ title }}</h2>
      <p class="text-gray-400">Rating: {{ rating }}</p>
<!--       <p class="text-gray-400">{{ release_date }}</p>
 -->    </div>
  </div>
</template>
