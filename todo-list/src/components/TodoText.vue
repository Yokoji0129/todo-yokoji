<script setup>
import TodoList from '../components/TodoList.vue'
import { ref, onMounted } from 'vue'
const searchTerm = ref('')
const todoList = ref([])
const todoListComp = ref([])

// ローカルストレージからデータを読み込む
const loadTodoListFromLocalStorage = () => {
  const storedTodoList = localStorage.getItem('todoList')
  if (storedTodoList) {
    todoList.value = JSON.parse(storedTodoList)
  }
  
  const storedTodoListComp = localStorage.getItem('todoListComp')
  if (storedTodoListComp) {
    todoListComp.value = JSON.parse(storedTodoListComp)
  }
}

// ローカルストレージにデータを保存する
const saveTodoListToLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList.value))
}

const saveTodoListCompToLocalStorage = () => {
  localStorage.setItem('todoListComp', JSON.stringify(todoListComp.value))
}

const addTodo = () => {
  if (searchTerm.value) {
    todoList.value.push(searchTerm.value)
    searchTerm.value = ''
    saveTodoListToLocalStorage()
  } else {
    window.alert('todoを入力してください')
  }
}

const addCompTodo = (todo) => {
  // 未完了リストから完了したものを削除(itemがtodoと異なるものを削除)
  todoList.value = todoList.value.filter(item => item !== todo)
  // 完了リストに追加
  todoListComp.value.push(todo)
  // 未完了todo
  saveTodoListToLocalStorage()
  // 完了済みtodo
  saveTodoListCompToLocalStorage()
}

// コンポーネントがマウントされた時にローカルストレージからデータを読み込む
onMounted(() => {
  loadTodoListFromLocalStorage()
})
</script>

<template>
  <div class="text">
    <input type="text" class="textbox-1" placeholder="タスクの追加" v-model="searchTerm" />
    <button class="btn" @click="addTodo()">add</button>
  </div>
  <TodoList :todoList="todoList" :addCompTodo="addCompTodo" :todoListComp="todoListComp" />
</template>

<style scoped>
.text {
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

.btn {
  padding: 0 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>