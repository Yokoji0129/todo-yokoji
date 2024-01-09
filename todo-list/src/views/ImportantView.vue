<script setup>
const props = defineProps({
  menuOpen: Boolean
})
import TodoText from '../components/TodoText.vue'; // テキスト入力コンポーネント
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>重要</h2>
    </div>
    <TodoText />
  </main>
</template>

<style scoped>
h2 {
  margin: 0;
}
</style>