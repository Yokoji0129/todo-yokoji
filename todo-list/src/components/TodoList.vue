<script setup>
import { ref } from 'vue'
const props = defineProps({
    todoList: Array,
    todoListComp: Array,
    addCompTodo: Function,
    deleteTodo: Function,
    deleteTodoComp: Function,
    addInCompTodo: Function
})
</script>

<template>
    <h1 v-if="todoList.length === 0 && todoListComp.length === 0">ToDoを追加してください</h1>
    <div>
        <h3 v-if="todoList.length">未完了({{ todoList.length }})</h3>
        <ul class="ul">
            <li class="li" v-for="(todo, i) in todoList" :key="i">
                <p class="heading-23">{{ todo }}</p>
                <button class="btn" @click="addCompTodo(todo)">完了</button>
                <button class="btn-delete" @click="deleteTodo(i)">削除</button>
            </li>
        </ul>
    </div>

    <div>
        <h3 class="h3" v-if="todoListComp.length">完了済み({{ todoListComp.length }})</h3>
        <ul class="ul">
            <li class="li" v-for="(todoComp, i) in todoListComp" :key="i">
                <p class="heading-23">{{ todoComp }}</p>
                <button class="btn-incomp" @click="addInCompTodo(todoComp)">未完</button>
                <button class="btn-delete" @click="deleteTodoComp(i)">削除</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.heading-23 {
    padding: 20px 10px;
    width: 100%;
    border-left: 5px solid #2589d0;
    border-bottom: 3px solid #d2d2d2;
    background-color: #f2f2f2;
    color: #333333;
}
h1{
    text-align: center;
}
p{
    margin: 0;
}
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
    border-bottom: 3px solid #d2d2d2;;
    padding: 0 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    cursor: pointer;
}

.btn:hover{
    background-color: rgb(167, 213, 163);
}
.btn-delete{
    background-color: rgb(255, 192, 192);
    border-bottom: 3px solid #d2d2d2;;
    padding: 0 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    cursor: pointer;
}
.btn-delete:hover{
    background-color: rgb(219, 165, 165);
}

.btn-incomp{
    background-color: rgb(192, 217, 255);
    border-bottom: 3px solid #d2d2d2;;
    padding: 0 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    cursor: pointer;
}
.btn-incomp:hover{
    background-color: rgb(166, 188, 220);
}
.textbox-3 {
    width: 100%;
    padding: 8px 10px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 3px;
    background: #eff6fc;
    color: #333;
    font-size: 1em;
    line-height: 1.5;
    color: black;
    font-weight: bold;
    border-bottom: 3px solid #d2d2d2;;
}
</style>