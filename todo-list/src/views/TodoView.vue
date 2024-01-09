<script setup>
import { ref, onMounted } from 'vue'
import DateToday from '../components/DateToday.vue'; // 今日の日付コンポーネント
import TodoText from '../components/TodoText.vue'; // テキスト入力コンポーネント
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>今日の予定</h2>
      <DateToday />
    </div>
    <div>
      <TodoText />
    </div>
  </main>
</template>

<style scoped>
h2 {
  margin: 0;
}
</style>