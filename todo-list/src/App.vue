<script setup>
import { ref } from 'vue';
import TopHeader from './components/TopHeader.vue'; // ヘッダー、メニューコンポーネント

const menuOpen = ref(false);

//ハンバーガーメニューの開閉
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>

<template>
  <TopHeader :toggleMenu="toggleMenu" :menuOpen="menuOpen" />
  <RouterView :menuOpen="menuOpen" />
</template>

<style>

</style>