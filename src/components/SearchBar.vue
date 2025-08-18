<script setup lang="ts">
import Arama from '../pages/arama.vue';

</script>


<template>
<div class="flex items-center space-x-0.5 justify-center mb-6">
    <input
        type="text"
        class="bg-gray-700 text-white rounded-full pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 placeholder-gray-300 shadow-md w-1/2 mx-3"
        placeholder="Film veya Dizi Ara..."
    />
    <button
        class="bg-yellow-400 text-gray-800 rounded-full px-4 py-2 hover:bg-yellow-500 transition-all duration-200"
        @click="$router.push('/arama')"
    >
        Ara
    </button>
</div>
</template>
