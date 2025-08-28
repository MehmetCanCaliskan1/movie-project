<script setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import MovieCard from '../components/MovieCard.vue';

const props = defineProps({
  title: { type: String, required: true },
  movieService: { type: Function, required: true }
});

const loading = ref(true);
const originalMovies = ref([]);
const movies = ref([]);
const page=ref(1);
const loadMovies = async () => {
  loading.value = true;
  try {
    originalMovies.value = await props.movieService( page.value );
    movies.value = [...originalMovies.value];
  } catch (err) {
    console.error('Film verisi alınamadı', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => loadMovies());

watch(
  () => props.movieService,
  () => {
    loadMovies();
  }
);
watch(
  () => props.title,
  () => {
    loadMovies();
  }
);

const applySort = (sort) => {
  let sorted = [...movies.value];
  if (sort === 'Popülerliğe Göre Azalan') sorted.sort((a, b) => b.popularity - a.popularity);
  else if (sort === 'Popülerliğe Göre Artan') sorted.sort((a, b) => a.popularity - b.popularity);
  else if (sort === 'En Yeni') sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  else if (sort === 'En Eski') sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  else if (sort === 'En Yüksek Oy Alan') sorted.sort((a, b) => b.vote_average - a.vote_average);
  else if (sort === 'En Düşük Oy Alan') sorted.sort((a, b) => a.vote_average - b.vote_average);

  movies.value = [...sorted];
};

const applyFilter = (filters) => {
  const filtered = originalMovies.value.filter(movie => {
    if (filters.action && movie.genre_ids.includes(28)) return true;
if (filters.adventure && movie.genre_ids.includes(12)) return true;
if (filters.animation && movie.genre_ids.includes(16)) return true;
if (filters.comedy && movie.genre_ids.includes(35)) return true;
if (filters.crime && movie.genre_ids.includes(80)) return true;
if (filters.documentary && movie.genre_ids.includes(99)) return true;
if (filters.drama && movie.genre_ids.includes(18)) return true;
if (filters.family && movie.genre_ids.includes(10751)) return true;
if (filters.fantasy && movie.genre_ids.includes(14)) return true;
if (filters.history && movie.genre_ids.includes(36)) return true;
if (filters.horror && movie.genre_ids.includes(27)) return true;
if (filters.music && movie.genre_ids.includes(10402)) return true;
if (filters.mystery && movie.genre_ids.includes(9648)) return true;
if (filters.romance && movie.genre_ids.includes(10749)) return true;
if (filters.scifi && movie.genre_ids.includes(878)) return true;
if (filters.tvMovie && movie.genre_ids.includes(10770)) return true;
if (filters.thriller && movie.genre_ids.includes(53)) return true;
if (filters.war && movie.genre_ids.includes(10752)) return true;
if (filters.western && movie.genre_ids.includes(37)) return true;

return !filters.action &&
       !filters.adventure &&
       !filters.animation &&
       !filters.comedy &&
       !filters.crime &&
       !filters.documentary &&
       !filters.drama &&
       !filters.family &&
       !filters.fantasy &&
       !filters.history &&
       !filters.horror &&
       !filters.music &&
       !filters.mystery &&
       !filters.romance &&
       !filters.scifi &&
       !filters.tvMovie &&
       !filters.thriller &&
       !filters.war &&
       !filters.western;
  });
  movies.value = [...filtered];
};



/* const loadMore = async () => {
  page.value++;
  loading.value = true;
  try {
    const newMovies = await props.movieService(page.value);
    movies.value = [...movies.value, ...newMovies];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
 
 */

</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar 
      :title="props.title"
      @sort-changed="applySort"
      @filter-changed="applyFilter"
    />
<div class="flex-1 p-6 grid grid-cols-3 md:grid-cols-5 gap-6">
      <div v-if="loading" class="text-center col-span-full">Yükleniyor...</div>
      <MovieCard v-for="movie in movies || []" :key="movie.id" :movie="movie" />
    </div>
    
  </div>
  <div class="col-span-full flex justify-center mt-4">
  <!-- <button 
  @click="loadMore"
  class="px-4 py-2 bg-gray-300 rounded cursor-pointer ml-[60px] hover:bg-green-400 transition-all duration-300"
  > Daha Fazla Yükle
</button>  -->
</div>
</template>
