<template>
  <div class="w-64 bg-gray-100 p-4 text-white min-h-screen text-center">
    <h2 class="text-xl font-extrabold mb-4 text-gray-900">{{ title }}</h2>
    <ul>
      
<li class="mt-8 relative">
  <p class="text-start font-extrabold text-lg text-gray-800"> SIRALA</p>
  <button 
    @click="toggleSort" 
    class="w-full bg-gray-700 px-4 py-2 font-bold rounded flex justify-between items-center hover:bg-gray-800 cursor-pointer"
  >
    {{ selectedSort || 'Seçim Yapınız' }}
    <span>▼</span>
  </button>
  <ul 
    v-show="showSort" 
    class=" left-0 mt-1 w-full bg-gray-700 font-bold rounded shadow-lg z-10"
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
  <button @click="toggleFilter"
   class="w-full flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">
    FİLTRELE
    <span>▼</span>
  </button>

  <ul v-show="showFilter" v-if="ismoviepage" class="mt-2 ml-2 bg-gray-700 p-2 rounded shadow-lg z-10">
    <li>TÜR SEÇİN</li>
  <li>
    <input type="checkbox" id="filter-action" v-model="filters.action" @change="emitFilters" />
    <label for="filter-action">Aksiyon</label>
  </li>

  <li>
    <input type="checkbox" id="filter-adventure" v-model="filters.adventure" @change="emitFilters" />
    <label for="filter-adventure">Macera</label>

    <input class="ml-2.5" type="checkbox" id="filter-animation" v-model="filters.animation" @change="emitFilters" />
    <label for="filter-animation">Animasyon</label>
  </li>

  <li>
    <input type="checkbox" id="filter-comedy" v-model="filters.comedy" @change="emitFilters" />
    <label for="filter-comedy">Komedi</label>
  
    <input class="ml-4 "type="checkbox" id="filter-crime" v-model="filters.crime" @change="emitFilters" />
    <label for="filter-crime">Suç</label>
  </li>

  <li>
    <input type="checkbox" id="filter-documentary" v-model="filters.documentary" @change="emitFilters" />
    <label for="filter-documentary">Belgesel</label>

    <input class="ml-4 " type="checkbox" id="filter-drama" v-model="filters.drama" @change="emitFilters" />
    <label for="filter-drama">Dram</label>
  </li>

  <li>
    <input type="checkbox" id="filter-family" v-model="filters.family" @change="emitFilters" />
    <label for="filter-family">Aile</label>
 
    <input class="ml-4 " type="checkbox" id="filter-fantasy" v-model="filters.fantasy" @change="emitFilters" />
    <label for="filter-fantasy">Fantastik</label>
  </li>

  <li>
    <input type="checkbox" id="filter-history" v-model="filters.history" @change="emitFilters" />
    <label for="filter-history">Tarih</label>
  
    <input class="ml-4 " type="checkbox" id="filter-horror" v-model="filters.horror" @change="emitFilters" />
    <label for="filter-horror">Korku</label>
  </li>

  <li>
    <input type="checkbox" id="filter-music" v-model="filters.music" @change="emitFilters" />
    <label for="filter-music">Müzik</label>
 
    <input class="ml-4 " type="checkbox" id="filter-mystery" v-model="filters.mystery" @change="emitFilters" />
    <label for="filter-mystery">Gizem</label>
  </li>

  <li>
    <input type="checkbox" id="filter-romance" v-model="filters.romance" @change="emitFilters" />
    <label for="filter-romance">Romantik</label>
  <input class="ml-4 " type="checkbox" id="filter-scifi" v-model="filters.scifi" @change="emitFilters" />
    <label for="filter-scifi">Bilim Kurgu</label>
   
  </li>


  <li>
    <input type="checkbox" id="filter-tvMovie" v-model="filters.tvMovie" @change="emitFilters" />
    <label for="filter-tvMovie">TV Filmi</label>
 
    <input class="ml-4 " type="checkbox" id="filter-thriller" v-model="filters.thriller" @change="emitFilters" />
    <label for="filter-thriller">Gerilim</label>
  </li>

  <li>
    <input type="checkbox" id="filter-war" v-model="filters.war" @change="emitFilters" />
    <label for="filter-war">Savaş</label>
  
    <input  class="ml-4 " type="checkbox" id="filter-western" v-model="filters.western" @change="emitFilters" />
    <label for="filter-western">Western</label>
  </li>

  </ul>
</li>

 <!-- DİZİLER İÇİN LİSTEM -->

<ul v-show="showFilter" v-if="!ismoviepage" class="mt-2 ml-2 bg-gray-700 p-2 rounded shadow-lg z-10">
  <li>TÜR SEÇİN</li>

  <li>
    <input type="checkbox" id="tv-action-adventure" v-model="filters['action-adventure']" @change="emitFilters" />
    <label for="tv-action-adventure">Aksiyon & Macera</label>
  </li>

  <li>
    <input type="checkbox" id="tv-animation" v-model="filters.animation" @change="emitFilters" />
    <label for="tv-animation">Animasyon</label>

    <input class="ml-2.5" type="checkbox" id="tv-comedy" v-model="filters.comedy" @change="emitFilters" />
    <label for="tv-comedy">Komedi</label>
  </li>

  <li>
    <input type="checkbox" id="tv-crime" v-model="filters.crime" @change="emitFilters" />
    <label for="tv-crime">Suç</label>

    <input class="ml-4" type="checkbox" id="tv-documentary" v-model="filters.documentary" @change="emitFilters" />
    <label for="tv-documentary">Belgesel</label>
  </li>

  <li>
    <input type="checkbox" id="tv-drama" v-model="filters.drama" @change="emitFilters" />
    <label for="tv-drama">Dram</label>

    <input class="ml-4" type="checkbox" id="tv-family" v-model="filters.family" @change="emitFilters" />
    <label for="tv-family">Aile</label>
  </li>

  <li>
    <input type="checkbox" id="tv-kids" v-model="filters.kids" @change="emitFilters" />
    <label for="tv-kids">Çocuk</label>

    <input class="ml-4" type="checkbox" id="tv-mystery" v-model="filters.mystery" @change="emitFilters" />
    <label for="tv-mystery">Gizem</label>
  </li>

  <li>
    <input type="checkbox" id="tv-news" v-model="filters.news" @change="emitFilters" />
    <label for="tv-news">Haber</label>

    <input class="ml-4" type="checkbox" id="tv-reality" v-model="filters.reality" @change="emitFilters" />
    <label for="tv-reality">Reality Show</label>
  </li>

  <li>
    <input type="checkbox" id="tv-sci-fantasy" v-model="filters['sci-fantasy']" @change="emitFilters" />
    <label for="tv-sci-fantasy">Bilim Kurgu & Fantastik</label>
  </li>

  <li>
    <input type="checkbox" id="tv-soap" v-model="filters.soap" @change="emitFilters" />
    <label for="tv-soap">Günlük Dizi / Soap</label>

    <input class="ml-4" type="checkbox" id="tv-talk" v-model="filters.talk" @change="emitFilters" />
    <label for="tv-talk">Talk Show</label>
  </li>

  <li>
    <input type="checkbox" id="tv-war-politics" v-model="filters['war-politics']" @change="emitFilters" />
    <label for="tv-war-politics">Savaş & Politika</label>

    <input class="ml-4" type="checkbox" id="tv-western" v-model="filters.western" @change="emitFilters" />
    <label for="tv-western">Western</label>
  </li>
</ul>

</ul>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps({
  title: {
    type: String,
    default: 'Sidebar'
  }
});
const filters = ref({
  // Film Türleri (TMDb)
  action: false,        
  adventure: false,     
  animation: false,     
  comedy: false,        
  crime: false,        
  documentary: false,   
  drama: false,         
  family: false,       
  fantasy: false,       
  history: false,     
  horror: false,      
  music: false,       
  mystery: false,      
  romance: false,     
  scifi: false,         
  tvMovie: false,       
  thriller: false,      
  war: false,           
  western: false,      

  // Dizi Türleri 
  'action-adventure': false, // 10759
  kids: false,               // 10762
  news: false,               // 10763
  reality: false,            // 10764
  'sci-fantasy': false,      // 10765
  soap: false,               // 10766
  talk: false,               // 10767
  'war-politics': false,     // 10768
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
const route=useRoute();
const ismoviepage = ref(route.name === 'Movies')

</script>
