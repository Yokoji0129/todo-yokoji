<script setup>
import { ref } from 'vue'
import DateToday from '../components/DateToday.vue'; // 今日の日付コンポーネント
import TodoText from '../components/TodoText.vue'; // テキスト入力コンポーネント
import TodoList from '../components/TodoList.vue' // todolistコンポーネント
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>今日の予定</h2>
      <!--今日の日付-->
      <DateToday />
    </div>
    <div>
      <!--テキスト入力-->
      <TodoText />
      <!--todolist-->
      <TodoList />
    </div>
  </main>
</template>

<style scoped>

h2 {
  margin: 0;
}
</style>