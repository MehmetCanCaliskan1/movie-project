<script setup>
</script>

<template>
  <div>
    <nav class="bg-gray-800 text-white p-4 flex gap-4 pl-8 flex flex-wrap">
      <router-link to="/" class="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-100 transition-transform duration-300">
        🎬 CineScope
      </router-link>
      <div class="relative group ml-8 cursor-pointer">  
          Filmler  
        <div class="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
          <router-link to="/movies/popular" class="block px-4 py-2 hover:bg-gray-100">Popüler</router-link>
          <router-link to="/movies/now_playing" class="block px-4 py-2 hover:bg-gray-100">Gösterimde</router-link>
          <router-link to="/movies/upcoming" class="block px-4 py-2 hover:bg-gray-100">Yakında</router-link>
          <router-link to="/movies/top_rated" class="block px-4 py-2 hover:bg-gray-100">En Çok Oy Alan</router-link>
        </div>
      </div>
       <div class="relative group ml-8 cursor-pointer">
          
          Diziler
        <div class="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
          <router-link to="/tv/popular" class="block px-4 py-2 hover:bg-gray-100">Popüler</router-link>
          <router-link to="/tv/on_the_air" class="block px-4 py-2 hover:bg-gray-100">Günün Programı</router-link>
          <router-link to="/tv/airing_today" class="block px-4 py-2 hover:bg-gray-100">Televizyonda</router-link>
          <router-link to="/tv/top_rated" class="block px-4 py-2 hover:bg-gray-100">En Fazla Oy Alanlar</router-link>
        </div>
      </div>
      
  <router-link to="/oyuncular" class="ml-4 transition-transform duration-200 hover:scale-120">Oyuncular</router-link>
 

 <router-link to="/hakkinda" class="ml-4 transition-transform duration-200 hover:scale-120">Hakkımızda</router-link>
      <router-link to="/iletisim" class="ml-4 transition-transform duration-200 hover:scale-120">İletişim</router-link>
      <router-link to="/login" class="ml-140 transition-transform duration-200 hover:scale-120">Giriş</router-link>
      <div class="relative ml-4 flex items-center">

      <button onclick="document.getElementById('search').focus()" class="-mt-1.5 absolute left-3 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" 
       class="h-7 w-20" 
       fill="none" 
       viewBox="0 0 24 24" 
       stroke="currentColor">
    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"/>
  </svg>
</button>

      </div>
    </nav>

    <main class="p-6">
      <router-view />
    </main>

  

  </div>
   <footer>
    <div class="bg-gray-800 text-white p-4 text-center left-0 w-full">
      <p class="text-sm">© 2025 CineScope. Tüm hakları saklıdır.</p>
    </div>
  </footer>

</template>
