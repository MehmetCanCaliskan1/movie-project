<template>
  <div class="w-64 bg-gray-600 p-4 text-white min-h-screen text-center">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <ul>
      
<li class="mt-8 relative">
  <p class="text-start font-extrabold text-lg"> SIRALA</p>
  <button 
    @click="toggleSort" 
    class="w-full bg-gray-700 px-4 py-2 rounded flex justify-between items-center hover:bg-gray-800"
  >
    {{ selectedSort || 'Seçim Yapınız' }}
    <span>▼</span>
  </button>
  <ul 
    v-show="showSort" 
    class=" left-0 mt-1 w-full bg-gray-700 rounded shadow-lg z-10"
  >
    <li 
      @click="selectSort('Popülerliğe Göre Azalan')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
      Popülerliğe Göre Azalan
    </li>
    <li 
      @click="selectSort('Popülerliğe Göre Artan')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
      Popülerliğe Göre Artan
    </li>
     <li 
      @click="selectSort('En Yeni')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
      En Yeni
    </li>
    <li 
      @click="selectSort('En Eski')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
     En Eski
    </li>
 <li 
      @click="selectSort('En Yüksek Oy Alan')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
      En Yüksek Oy Alan
    </li>
    <li 
      @click="selectSort('En Düşük Oy Alan')" 
      class="px-4 py-2 hover:bg-gray-800 cursor-pointer"
    >
      En Düşük Oy Alan  
    </li>
  </ul>
</li>

    <li class="mt-5 text-start font-extrabold text-lg relative">
  <button @click="toggleFilter" class="w-full flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-800">
    FİLTRELE
    <span>▼</span>
  </button>

  <ul v-show="showFilter" class="mt-2 ml-2 bg-gray-700 p-2 rounded shadow-lg z-10">
    <li>TÜR SEÇİN</li>
    <li>
<input 
  type="checkbox" 
  id="filter-action" 
  v-model="filters.action" 
  @change="emitFilters"
/>      <label for="filter-action">Aksiyon</label>
    </li>
    <li>
<input 
  type="checkbox" 
  id="filter-drama" 
  v-model="filters.drama" 
  @change="emitFilters"
/>      <label for="filter-drama">Dram</label>
    </li>
    <li>
<input 
  type="checkbox" 
  id="filter-comedy" 
  v-model="filters.comedy" 
  @change="emitFilters"
/>      <label for="filter-comedy">Komedi</label>
    </li>
  </ul>
</li>

    
</ul>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Sidebar'
  }
});
const filters = ref({
  action: false,
  drama: false,
  comedy: false,
});
const emitFilters = () => {
  emit('filter-changed', { ...filters.value });
};

const emit = defineEmits('sort-changed'); 

const showSort = ref(false);

const toggleSort = () => {
  showSort.value = !showSort.value;
    if (showSort.value) showFilter.value = false;

};

const selectedSort = ref('');

const selectSort = (sort) => {
  selectedSort.value = sort;
  showSort.value = false;
  emit('sort-changed', sort); 
};

const showFilter = ref(false);

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
    if (showFilter.value) showSort.value = false;

};
</script>
