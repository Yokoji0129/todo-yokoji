<script setup>
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    重要
  </main>
</template>
