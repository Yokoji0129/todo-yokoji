<script setup>
import TodoList from "../components/TodoList.vue";
import { ref, onMounted } from "vue";
const searchTerm = ref("");
const todoList = ref([]);
const todoListComp = ref([]);

// ローカルストレージにデータを保存する
const saveTodoListToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const saveTodoListCompToLocalStorage = () => {
  localStorage.setItem("todoListComp", JSON.stringify(todoListComp.value));
};

// todoを追加するメソッド
const addTodo = () => {
  if (searchTerm.value) {
    todoList.value.push(searchTerm.value);
    searchTerm.value = "";
    saveTodoListToLocalStorage();
  } else {
    window.alert("todoを入力してください");
  }
};

const updateTodoList = (updatedList) => {
  todoList.value = updatedList;
  saveTodoListToLocalStorage();
};

const updateTodoListComp = (updatedList) => {
  todoListComp.value = updatedList;
  saveTodoListCompToLocalStorage();
};
</script>

<template>
  <div class="text">
    <input
      type="text"
      class="textbox-1"
      placeholder="タスクの追加"
      v-model="searchTerm"
      @keyup.enter="addTodo"
    />
    <!--文字が入力されている場合cursor: pointer 入力されていない場合 cursor: not-alloweb-->
    <button
      class="btn"
      :style="{ cursor: searchTerm ? 'pointer' : 'not-allowed' }"
      @click="addTodo()"
    >
      add
    </button>
  </div>
  <TodoList
    :todoList="todoList"
    :todoListComp="todoListComp"
    :saveTodoListToLocalStorage="saveTodoListToLocalStorage"
    :saveTodoListCompToLocalStorage="saveTodoListCompToLocalStorage"
    @updateTodoList="updateTodoList"
    @updateTodoListComp="updateTodoListComp"
  />
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
}
</style>
