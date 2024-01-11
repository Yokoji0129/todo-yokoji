<script setup>
const props = defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <main :class="{ 'shift-right': menuOpen }">
    <div>
      <h1>TODOリスト作ってみました!!!</h1>
    </div>
  </main>
</template>

<style scoped>
h1{
  font-size: 100px;
  text-align: center;
}
</style>