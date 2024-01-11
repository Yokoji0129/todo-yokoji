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

// todoを追加するメソッド
const addTodo = () => {
  if (searchTerm.value) {
    todoList.value.push(searchTerm.value)
    searchTerm.value = ''
    saveTodoListToLocalStorage()
  } else {
    window.alert('todoを入力してください')
  }
}

// todoを完了させるメソッド
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

// 完了済みから未完了にtodoを移動させる
const addInCompTodo = (todo) => {
  todoListComp.value = todoListComp.value.filter(item => item !== todo);
  todoList.value.push(todo)
  saveTodoListToLocalStorage()
  saveTodoListCompToLocalStorage()
}

// 未完了todoから削除
const deleteTodo = (index) => {
  todoList.value.splice(index, 1)
  saveTodoListToLocalStorage()
}

// 完了済みtodoから削除
const deleteTodoComp = (index) => {
  todoListComp.value.splice(index, 1)
  saveTodoListCompToLocalStorage()
}

// コンポーネントがマウントされた時にローカルストレージからデータを読み込む
onMounted(() => {
  loadTodoListFromLocalStorage()
})
</script>

<template>
  <!--検索ボックス-->
  <div class="search-box">
    <input class="search" type="text" placeholder="検索">
  </div>
  <div class="text">
    <input type="text" class="textbox-1" placeholder="タスクの追加" v-model="searchTerm" @keyup.enter="addTodo" />
    <button class="btn" @click="addTodo()">add</button>
  </div>
  <TodoList :todoList="todoList" :addCompTodo="addCompTodo" :deleteTodo="deleteTodo" :todoListComp="todoListComp"
    :deleteTodoComp="deleteTodoComp" :addInCompTodo="addInCompTodo" />
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