import {createRouter, createWebHistory} from 'vue-router';
import home from '../pages/home.vue';
import hakkimizda from '../pages/hakkimizda.vue';
import iletisim from '../pages/iletisim.vue';
import login from '../pages/login.vue';
import detay  from '../pages/detay.vue';
import Arama from '../pages/arama.vue';
import oyuncudetay from '../pages/oyuncudetay.vue';
import oyuncular from '../pages/oyuncular.vue'

import moviepage from '../pages/moviepage.vue';
import popular,{ nowPlaying,upcoming,topRated }  from '../services/movieService.js'; 
import popularTVShows, { airingTodayTVShows,onTheAirTVShows,topRatedTVShows } from '../services/diziService.js';
import tvpage from '../pages/tvpage.vue';



const routes = [
  { path: '/', component: home },

/*   { path: '/tv/popular', component: popularTVShows },
  { path: '/tv/on_the_air', component: () => import('../pages/tv/on_the_air.vue') },
  { path: '/tv/airing_today', component: () => import('../pages/tv/airing_today.vue') },
  { path: '/tv/top_rated', component: () => import('../pages/tv/top_rated.vue') }, */

  { path: '/hakkinda', component: hakkimizda },
  { path: '/iletisim', component: iletisim },
  { path: '/login', component: login },
  { path: '/arama', component: Arama},
  
  { path: '/pages/detay/:type/:id', component: detay },
  { path: '/pages/oyuncudetay/:id', component: oyuncudetay},
  { path: '/oyuncular', component: oyuncular},
  
  {
    path: '/movies/:type',
    name: 'Movies',
    component: moviepage,
    props: route => {
      let service = null;
      let title = '';
      switch(route.params.type) {
        case 'now_playing':
          service = nowPlaying;
          title = 'Gösterimdeki Filmler';
          break;
        case 'popular':
          service = popular;
          title = 'Popüler Filmler';
          break;
         case 'upcoming':
          service = upcoming;
          title = 'Gelecek Filmler';
          break;  
          case 'top_rated':
          service = topRated;
          title = 'En Yüksek Oy Alan Filmler';
          break;  
      }
      return { movieService: service, title };
    }
  },
  {
    path: '/tv/:type',
    name: 'TvShows',
    component: tvpage,
    props: route => {
      let service = null;
      let name = '';
      switch(route.params.type) {
        case 'airing_today':
          service = airingTodayTVShows;
          name = 'Şu Anda Yayınlanan Diziler' ;
          break;
        case 'on_the_air':
          service = onTheAirTVShows;
          name = 'Bugün Başlayan Diziler';
          break;
         case 'popular':
          service = popularTVShows;
          name = 'Popüler Diziler';
          break;  
          case 'top_rated':
          service = topRatedTVShows;
          name = 'En Yüksek Oy Alan Diziler';
          break;  
        
      }
      return { diziService: service, name };
    }
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;