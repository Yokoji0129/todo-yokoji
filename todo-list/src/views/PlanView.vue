<script setup>
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>今後の予定</h2>
    </div>
  </main>
</template>

<style scoped>
h2 {
  margin: 0;
}
</style>