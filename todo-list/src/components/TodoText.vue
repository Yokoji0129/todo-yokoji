<script setup>
import TodoList from "../components/TodoList.vue";
import { ref, computed } from "vue";
const searchTerm = ref("");
const newTodo = ref(""); // todoを追加する文字入れ
const todoList = ref([]); // todoを追加するときの配列
const todoListComp = ref([]); // 完了済みtodoを入れる配列
const selectDate = ref("");

// ローカルストレージにデータを保存する
const saveTodoListToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const saveTodoListCompToLocalStorage = () => {
  localStorage.setItem("todoListComp", JSON.stringify(todoListComp.value));
};

// todoを追加するメソッド
const addTodo = () => {
  if (newTodo.value) {
    // 期日を入れた時と入れないときの分岐
    if (selectDate.value) {
      todoList.value.push("期日: " + selectDate.value + "　" + newTodo.value);
      newTodo.value = "";
      saveTodoListToLocalStorage();
    } else {
      todoList.value.push(newTodo.value);
      newTodo.value = "";
      saveTodoListToLocalStorage();
    }
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
    <input class="search" type="text" placeholder="検索">
  </div>
  <div class="text">
    <input type="text" class="textbox-1" placeholder="タスクの追加" v-model="searchTerm" @keyup.enter="addTodo" />
    <button class="btn" @click="addTodo()">add</button>
  </div>
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
  <input type="date" class="calendar" v-model="selectDate" />
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

.calendar {
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1em;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 影を追加 */
  transition: background-color 0.3s, transform 0.2s; /* ホバーエフェクトのトランジション */
}

.calendar:hover {
  background-color: #e0e0e0;
  transform: scale(1.02);
}
</style>
