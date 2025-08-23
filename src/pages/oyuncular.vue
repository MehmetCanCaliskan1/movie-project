<template>
  <div class="p-4">
    <h1 class="text-2xl font-extrabold mb-4">Popüler Oyuncular</h1>
    <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div v-for="person in people" :key="person.id" class="text-center">
        <img
          v-if="person.profile_path"
          :src="`https://image.tmdb.org/t/p/w200${person.profile_path}`"
          alt="person.name"
          class="rounded-lg mb-2 cursor-pointer"
         @click="$router.push(`/pages/oyuncudetay/${person.id}`)">
        
        <div v-else class="w-32 h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
          No Image
        </div>
        <p class="font-semibold text-left">{{ person.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const people = ref([]);
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );
    people.value = res.data.results;
  } catch (error) {
    console.error('Popüler oyuncular alınamadı:', error);
  }
});
</script>
