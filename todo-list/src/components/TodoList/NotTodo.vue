<script setup>
const props = defineProps({
    searchTerm: String,
    localTodoList: Array,
    localTodoListComp: Array
})
</script>

<template>
    <div>
        <h1 v-if="searchTerm.length === 0 &&
            localTodoList.length === 0 &&
            localTodoListComp.length === 0
            ">
            ToDoを追加してください
        </h1>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
}
</style>