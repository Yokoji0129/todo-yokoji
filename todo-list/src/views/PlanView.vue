<script setup>
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    今後の予定
  </main>
</template>
