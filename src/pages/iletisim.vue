<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Bize Sorun</h1>

    <form @submit="handleSubmit" class="w-full max-w-lg bg-white p-8 rounded shadow-md">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">İsim</label>
        <input
          type="text"
          placeholder="Adınız"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" >E-posta</label>
        <input
         
          type="email"
          placeholder="Email adresiniz"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" >Mesaj</label>
        <textarea
         
          rows="5"
          placeholder="Mesajınızı yazın..."
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        ></textarea>
      </div>
<div class="flex justify-center">
      <button
        type="submit"
        class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors flex "
      >
        Gönder
      </button>
      </div>
    </form>
  </div>
</template>

<script setup>


const handleSubmit = (e) => {
  e.preventDefault();
  alert('Mesajınız gönderildi!');
  window.location.reload();
};
</script>
