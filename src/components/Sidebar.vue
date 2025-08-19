<template>
  <div class="w-64 bg-teal-500 p-4 text-white min-h-screen">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <ul>
      <li>Home</li>
      <li>Movies</li>
      <li>TV Shows</li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'Sidebar'
  }
});

</script>