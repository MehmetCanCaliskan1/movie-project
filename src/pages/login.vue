<template>
  <div class=" min-h-screen flex flex-col items-center bg-gray-50 p-6">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8">Giriş Yap</h1>

    <form @submit="handleSubmit" class="w-full max-w-lg bg-white p-8 rounded shadow-md">
    

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" >E-posta</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="Email"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

 <div class="mb-4">
     <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Şifre</label>
        <input
          v-model="password"
          type="password"
          required
          placeholder="Şifreniz"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
<div class="flex justify-center mt-8">
      <button
        type="submit"
        class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Giriş Yap
      </button>
      </div>

     <!-- <a href="">
      <div class="mt-4 flex justify-center font-bold hover:underline cursor-pointer">Şifremi Unuttum</div></a> -->

      
        
      <span 
      
      class="flex justify-center font-bold hover:underline cursor-pointer mt-4">
      Hesabınız Yok Mu? Kaydol
      </span>

    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "/stores/auth.js";
let email = ref("");
let password = ref("");

const router = useRouter();
const auth = useAuthStore(); 

const users = [
  { email: "mehmet@gmail.com", password: "123", name: "Mehmet" },
  { email: "ayse@ay.com", password: "asd", name: "Ayşe" },
  {email:"ee@ee",password:"ee",name:"Mehmet Can"}
];



const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  );
 if (user) {
    auth.login(user.email,user.name); 
    router.push("/");       
    console.log("Email:", email.value);
    console.log("Password:", password.value);
  } else {
    alert("E-posta veya şifre hatalı!");
  }
    
    email.value = "";
    password.value = "";
};
</script>
