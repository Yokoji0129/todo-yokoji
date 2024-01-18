<script setup>
import SortButton from "../TodoText/SortButton.vue";
import TodoList from "../../components/TodoList/TodoList.vue";
import { ref, computed } from "vue";
const searchTerm = ref("");
const newTodo = ref(""); // todoを追加する文字入れ
const todoList = ref([]); // todoを追加するときの配列
const todoListComp = ref([]); // 完了済みtodoを入れる配列
const selectDate = ref(""); // 選択した日付を入れる

const showSortMenu = ref(false);

const toggleSortMenu = () => {
  showSortMenu.value = !showSortMenu.value;
};

// ローカルストレージにデータを保存する
const saveTodoListToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const saveTodoListCompToLocalStorage = () => {
  localStorage.setItem("todoListComp", JSON.stringify(todoListComp.value));
};

// todoを追加するメソッド
const addTodo = () => {
  if (newTodo.value && selectDate.value) {
    todoList.value.push("期日: " + selectDate.value + "　" + newTodo.value);
    newTodo.value = "";
    saveTodoListToLocalStorage();
  } else {
    window.alert("todoと期日を入力してください");
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

// フィルタリングされた未完了todoリスト
const filteredTodoList = computed(() => {
  return todoList.value.filter((todo) =>
    todo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// フィルタリングされた完了済みtodoリスト
const filteredTodoCompList = computed(() => {
  return todoListComp.value.filter((todo) =>
    todo.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<template>
  <!--検索ボックス-->
  <div class="search-box">
    <input class="search" type="text" placeholder="検索" v-model="searchTerm" />
  </div>
  <!--ToDo入力欄-->
  <div class="text">
    <input
      type="text"
      class="textbox-1"
      placeholder="タスクの追加"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <!--文字が入力されている場合cursor: pointer 入力されていない場合 cursor: not-alloweb-->
    <button
      class="btn"
      :style="{ cursor: newTodo ? 'pointer' : 'not-allowed' }"
      @click="addTodo()"
    >
      add
    </button>
  </div>
  <!--日付追加と並び替えメニューボタン-->
  <div class="date-sort">
    <input type="date" class="calendar" v-model="selectDate" />
    <p class="sort" @click="toggleSortMenu()">↑↓並べ替え</p>
  </div>
  <!--ソート機能ボタン-->
  <SortButton
    :todoList="todoList"
    :todoListComp="todoListComp"
    :showSortMenu="showSortMenu"
  />
  <!--todoList一覧の部分-->
  <TodoList
    :searchTerm="searchTerm"
    :filteredTodoCompList="filteredTodoCompList"
    :filteredTodoList="filteredTodoList"
    :todoList="todoList"
    :todoListComp="todoListComp"
    :saveTodoListToLocalStorage="saveTodoListToLocalStorage"
    :saveTodoListCompToLocalStorage="saveTodoListCompToLocalStorage"
    @updateTodoList="updateTodoList"
    @updateTodoListComp="updateTodoListComp"
  />
</template>

<style scoped>
.search-box {
  margin: 5px 0;
}

.search {
  padding: 10px 200px 10px 5px;
  border-radius: 10px;
  border: none;
  transition: 0.3s;
}

.search:hover {
  background-color: #ebebeb;
  transform: scale(1.02);
}

.search:focus {
  outline: none;
}

.text {
  margin-top: 60px;
  display: flex;
}

.textbox-1 {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px 3px 3px 0;
  font-size: 1em;
  line-height: 1.5;
  background-color: #ffffff;
}

.textbox-1::placeholder {
  color: #6f98e0;
  padding: 2px;
}

.btn {
  padding: 0 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.calendar {
  border: none;
  cursor: pointer;
  background-color: #ebebeb;
}
.date-sort {
  display: flex;
}

.sort {
  cursor: pointer;
  margin: 5px 10px;
  padding: 5px 10px;
}
</style>
