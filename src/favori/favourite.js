import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]); //  id, type, title, poster 

  function toggleFavorite(item, type) {
    const exists = favorites.value.find(f => f.id === item.id && f.type === type);
    if (exists) {
      favorites.value = favorites.value.filter(f => !(f.id === item.id && f.type === type));
    } else {
      favorites.value.push({
        id: item.id,
        type,
        title: item.title || item.name,
        poster: item.poster_path
      });
    }
  }

  function isFavorite(id, type) {
    return favorites.value.some(f => f.id === id && f.type === type);
  }

  return { favorites, toggleFavorite, isFavorite };
});
