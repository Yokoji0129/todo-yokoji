<script setup>
import { ref } from 'vue'
const test = ref('もかぴとでーと')
</script>

<template>
    <div>
        <h3>未完了(6)</h3>
        <ul class="ul">
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn">完了</button>
            </li>
        </ul>
    </div>

    <div>
        <h3 class="h3">完了済み(2)</h3>
        <ul class="ul">
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn-delete">削除</button>
            </li>
            <li class="li">
                <textarea class="textbox-3">{{ test }}</textarea>
                <button class="btn-delete">削除</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.h3{
    margin: 0;
}
.ul{
    margin: 30px 0;
}
ul li{
    list-style: none;
    margin: 0 60px 10px 0;
}

.li{
    display: flex;
}

.btn{
    background-color: rgb(197, 255, 192);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 0 30px;
    border: none;
    cursor: pointer;
}

.btn:hover{
    background-color: rgb(167, 213, 163);
}
.btn-delete{
    background-color: rgb(255, 192, 192);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 0 30px;
    border: none;
    cursor: pointer;
}
.btn-delete:hover{
    background-color: rgb(219, 165, 165);
}
.textbox-3 {
    width: 90%;
    padding: 8px 10px;
    border: none;
    border-radius: 3px;
    background: #eff6fc;
    color: #333;
    font-size: 1em;
    line-height: 1.5;
    color: black;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>