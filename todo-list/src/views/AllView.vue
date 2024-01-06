<script setup>
import { ref } from 'vue'
import TodoText from '../components/TodoText.vue'
const props = defineProps({
  menuOpen: Boolean,
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>タスク</h2>
    </div>
    <TodoText />
  </main>
</template>

<style scoped>
h2 {
  margin: 0;
}
</style>