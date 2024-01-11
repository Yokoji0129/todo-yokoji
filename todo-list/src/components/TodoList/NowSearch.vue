<script setup>
const props = defineProps({
    searchTerm: String
})
</script>

<template>
    <div v-if="searchTerm.length">
        <h1>"{{ searchTerm }}" を検索中</h1>
    </div>
</template>

<style scoped>
h1{
    text-align: center;
}
</style>