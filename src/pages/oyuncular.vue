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

     <div class="flex justify-center  gap-2 -ml-3 font-extrabold">Sayfa</div>
    <div class="flex justify-center mt-4 gap-2">
      <button @click="prevPage" :disabled="page === 1" 
  class="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-blue-400 transition-colors duration-300"
      >Önceki</button>
      <span class="px-2 py-2 text-xl">{{ page }}</span>
      <button @click="nextPage" 
  class="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-blue-400 transition-colors duration-300"
      >Sonraki</button>
      <button></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const people = ref([]);
const page = ref(1);
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchPeople = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=tr-TR&page=${page.value}`
    );
    people.value = res.data.results;
  } catch (error) {
    console.error('Oyuncular alınamadı:', error);
  }
};

onMounted(fetchPeople);

watch(page,async ()=>{
await fetchPeople();
window.scrollTo({
top:0
}
);
}
);

const nextPage = () => page.value++;
const prevPage = () => page.value--;
</script>
