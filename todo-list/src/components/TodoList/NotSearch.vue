<script setup>
const props = defineProps({
    searchTerm: String,
    filteredTodoList: Array,
    filteredTodoCompList: Array
})
</script>

<template>
    <!--検索結果がない場合デザイン-->
    <div v-if="searchTerm.length &&
        filteredTodoList.length === 0 &&
        filteredTodoCompList.length === 0
        ">
        <h2 class="h2">検索結果なし</h2>
    </div>
</template>

<style scoped>
.h2 {
    color: #2589d0;
    background-color: #f2f2f2;
    text-align: center;
}
</style>