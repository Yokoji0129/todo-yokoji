<script setup>

</script>

<template>
    <div class="text">
        <input type="text" class="textbox-1" placeholder="タスクの追加" />
        <button class="btn">add</button>
    </div>
</template>

<style scoped>
.text{
    margin-top: 60px;
    display: flex;
}
.textbox-1 {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
    line-height: 1.5;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.textbox-1::placeholder {
    color: #6f98e0;
    padding: 2px;
}

.btn{
    padding: 0 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>