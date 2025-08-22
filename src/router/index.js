import {createRouter, createWebHistory} from 'vue-router';
import home from '../pages/home.vue';
import hakkimizda from '../pages/hakkimizda.vue';
import iletisim from '../pages/iletisim.vue';
import login from '../pages/login.vue';
import popular from '../pages/movie/popular.vue';
import now_playing from '../pages/movie/now_playing.vue';
import upcoming from '../pages/movie/upcoming.vue';
import topRated from '../pages/movie/topRated.vue';
import popularTVShows from '../pages/tv/popular.vue';
import detay  from '../pages/detay.vue';
import Arama from '../pages/arama.vue';
import oyuncudetay from '../pages/oyuncudetay.vue';
const routes = [
  { path: '/', component: home },
  { path: '/movie/popular', component: popular },
  { path: '/movie/now_playing', component: now_playing },
  { path: '/movie/upcoming', component: upcoming },
  { path: '/movie/top_rated', component: topRated },

  { path: '/tv/popular', component: popularTVShows },
  { path: '/tv/on_the_air', component: () => import('../pages/tv/on_the_air.vue') },
  { path: '/tv/airing_today', component: () => import('../pages/tv/airing_today.vue') },
  { path: '/tv/top_rated', component: () => import('../pages/tv/top_rated.vue') },

  { path: '/hakkinda', component: hakkimizda },
  { path: '/iletisim', component: iletisim },
  { path: '/login', component: login },
  { path: '/arama', component: Arama},
  
  { path: '/pages/detay/:type/:id', component: detay },
  { path: '/pages/oyuncudetay/:id', component: oyuncudetay}

];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;