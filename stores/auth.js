import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userEmail = ref("");
  const userName=ref("");

  const login = (email,name) => {
    isLoggedIn.value = true;
    userEmail.value = email;
    userName.value=name;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userEmail.value = "";
    userName.value="";
    window.alert("Çıkış Yapıldı!");
  };

  return { isLoggedIn, userEmail,userName, login, logout };
});
