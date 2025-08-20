<script setup lang="ts">
import { ref } from 'vue';
const searchQuery = ref('');


</script>


<template>
<div class="flex items-center space-x-0.5 justify-center mb-6">
    <input
        v-model="searchQuery"
        type="text"
        class="bg-gray-700 text-white rounded-full pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 placeholder-gray-300 shadow-md w-1/2 mx-3"
        placeholder="Film veya Dizi Ara..."
         @keyup.enter="$router.push({ path:'/arama', query: { q: searchQuery.value } })"

    />
    <button
        class="bg-yellow-400 text-gray-800 rounded-full px-4 py-2 hover:bg-yellow-500 transition-all duration-200 cursor-pointer"
        @click="$router.push({ path:'/arama', query: { q: searchQuery.value } })"
    >

        Ara
    </button>
</div>
</template>
