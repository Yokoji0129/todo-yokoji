<script setup>
import { ref } from 'vue'
const props = defineProps({
  menuOpen: Boolean
})

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let week = ['日', '月', '火', '水', '木', '金', '土'];
let jsmonth = month - 1;
let date = new Date(year, jsmonth, day);
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h2>今日の予定</h2>
      <p style="color: #868686;">{{ month + '月' + day + '日(' + week[date.getDay()] + '曜日)' }}</p>
    </div>
  </main>
</template>

<style scoped>

h2 {
  margin: 0;
}

p{
  margin: 0;
}
</style>