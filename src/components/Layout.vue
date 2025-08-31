<script setup>
import { useAuthStore } from "/stores/auth.js";
import { useRouter } from "vue-router";
import {ref} from 'vue';
const auth = useAuthStore();
const router=useRouter();

const Logoutfonk = () => {
  auth.logout();
  router.push("/"); 
};
const MenuOpen = ref(false);
const openMovies = ref(false);
const openSeries = ref(false);
</script>

<template>
  <div>
 <nav class="bg-gray-800 text-white p-4 flex flex-wrap items-center relative z-50">
    <router-link
      to="/"
      class="text-2xl font-extrabold mr-5 bg-gradient-to-r from-yellow-400 via-green-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-300"
    >
      🎬 CineScope
    </router-link>

    <div class="hidden md:flex items-center gap-8">
      <div
        class="relative group cursor-pointer"
    
      >
        <span @mouseover="openMovies = true">Filmler</span>
        <div
          v-show="openMovies"
          @mouseleave="openMovies = false"

          class="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg transition duration-200 z-10"
        >
          <router-link to="/movies/popular" class="block px-4 py-2 hover:bg-yellow-100">Popüler</router-link>
          <router-link to="/movies/now_playing" class="block px-4 py-2 hover:bg-yellow-100">Gösterimde</router-link>
          <router-link to="/movies/upcoming" class="block px-4 py-2 hover:bg-yellow-100">Yakında</router-link>
          <router-link to="/movies/top_rated" class="block px-4 py-2 hover:bg-yellow-100">En Çok Oy Alan</router-link>
        </div>
      </div>

      <div
        class="relative group cursor-pointer"
      >
        <span @mouseover="openSeries = true">Diziler</span>
        <div
          v-show="openSeries"
          @mouseleave="openSeries = false"

          class="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg transition duration-200 z-10"
        >
          <router-link to="/tv/popular" class="block px-4 py-2 hover:bg-yellow-100">Popüler</router-link>
          <router-link to="/tv/on_the_air" class="block px-4 py-2 hover:bg-yellow-100">Günün Programı</router-link>
          <router-link to="/tv/airing_today" class="block px-4 py-2 hover:bg-yellow-100">Televizyonda</router-link>
          <router-link to="/tv/top_rated" class="block px-4 py-2 hover:bg-yellow-100">En Fazla Oy Alanlar</router-link>
        </div>
      </div>

      <router-link to="/oyuncular" class="transition-transform duration-200 hover:scale-110">Oyuncular</router-link>
      <router-link to="/hakkinda" class="transition-transform duration-200 hover:scale-110">Hakkımızda</router-link>
      <router-link to="/iletisim" class="transition-transform duration-200 hover:scale-110">İletişim</router-link>
    </div>

    <!-- Sağ Navım -->
    <div class="flex items-center gap-8 ml-auto">
      <div v-if="!auth.isLoggedIn">
        <router-link to="/login" class="transition-transform duration-200 hover:scale-110 cursor-pointer">
          Giriş Yap
        </router-link>
      </div>
      <div v-else class="flex items-center gap-8">
        <span class="transition-transform duration-200 hover:scale-110 cursor-pointer">{{ auth.userName }}</span>
        <button @click="Logoutfonk" class="transition-transform duration-200 hover:scale-110 cursor-pointer">
          Çıkış Yap
        </button>
      </div>

      <button
        @click="MenuOpen = !MenuOpen"
        class="md:hidden text-white focus:outline-none text-2xl cursor-pointer"
      >
        ☰
      </button>
    </div>

    <div
      v-if="MenuOpen"
      class="fixed inset bg-opacity-50 z-40 md:hidden"
      @click="MenuOpen = false"
    ></div>

    <div
  v-if="MenuOpen"
  class="fixed top-0 left-0 h-full w-2/3 bg-gray-800 text-white flex flex-col gap-4 p-6 z-50 md:hidden"
>
  <router-link to="/" @click="MenuOpen = false">Anasayfa</router-link>

  <div>
    <div @click="openMovies = !openMovies" class="cursor-pointer flex justify-between items-center">
      Filmler
      <span>{{ openMovies ? '▲' : '▼' }}</span>
    </div>
    <div v-if="openMovies" class="flex flex-col ml-4 mt-2 gap-2">
      <router-link to="/movies/popular" @click="MenuOpen = false">Popüler</router-link>
      <router-link to="/movies/now_playing" @click="MenuOpen = false">Gösterimde</router-link>
      <router-link to="/movies/upcoming" @click="MenuOpen = false">Yakında</router-link>
      <router-link to="/movies/top_rated" @click="MenuOpen = false">En Çok Oy Alan</router-link>
    </div>
  </div>

  <div>
    <div @click="openSeries = !openSeries" class="cursor-pointer flex justify-between items-center">
      Diziler
      <span>{{ openSeries ? '▲' : '▼' }}</span>
    </div>
    <div v-if="openSeries" class="flex flex-col ml-4 mt-2 gap-2">
      <router-link to="/tv/popular" @click="MenuOpen = false">Popüler</router-link>
      <router-link to="/tv/on_the_air" @click="MenuOpen=false ">Günün Programı</router-link>
      <router-link to="/tv/airing_today" @click="MenuOpen = false">Televizyonda</router-link>
      <router-link to="/tv/top_rated" @click="MenuOpen = false">En Çok Oy Alan</router-link>
    </div>
  </div>

  <router-link to="/oyuncular" @click="MenuOpen = false">Oyuncular</router-link>
  <router-link to="/hakkinda" @click="MenuOpen = false">Hakkımızda</router-link>
  <router-link to="/iletisim" @click="MenuOpen = false">İletişim</router-link>
</div>

  </nav>

    <main class="p-6">
      <router-view />
    </main>

  </div>
  <footer class="bg-gray-900 text-gray-300 py-6">
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="text-xl font-bold text-white">
     🎬 CineScope
    </div>
    
    <p class="text-sm md:text-base font-extrabold">
      © 2025 CineScope. Tüm hakları saklıdır.
    </p>

    <div class="flex gap-4">
      <a href="https://www.linkedin.com/in/mehmet-can-%C3%A7al%C4%B1%C5%9Fkan-165111246/" 
       target="_blank" 
      rel="noopener noreferrer" 
      class="hover:text-white transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.36V9h3.414v1.561h.049c.476-.898 1.637-1.846 3.368-1.846 3.598 0 4.265 2.368 4.265 5.448v6.289zM5.337 7.433c-1.145 0-2.072-.928-2.072-2.072 0-1.146.927-2.073 2.072-2.073 1.146 0 2.073.927 2.073 2.073 0 1.144-.927 2.072-2.073 2.072zm1.777 13.019H3.56V9h3.554v11.452z"/>
  </svg>
       </a>

     <a href="https://github.com/MehmetCanCaliskan1" 
        target="_blank" 
        rel="noopener noreferrer" 
     class="hover:text-white transition-colors ml-5">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.385-1.334-1.753-1.334-1.753-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.932 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013-.404c1.02.005 2.046.137 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.814 1.096.814 2.21v3.28c0 .32.218.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
</a>
    </div>
  </div>
</footer>

</template>
