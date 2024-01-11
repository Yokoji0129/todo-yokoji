<script setup>
import TodoList from "../components/TodoList.vue";
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

const sortAiueo = () => {
  todoList.value.sort((a, b) => {
    // "期日: " の部分だけを取り出して比較
    const todoA = extractNewTodo(a);
    const todoB = extractNewTodo(b);
    return todoA.localeCompare(todoB);
  });
}

// 正規表現で日付の文字列を抽出する
const extractDate = (todo) => {
  // todoの文字列が(/期日: (.+?)　/)の正規表現とマッチしているかを検査
  const dateMatch = todo.match(/期日: (.+?)　/);
  return dateMatch ? dateMatch[1] : ''; // sateMatch[1]は日付の部分
};

// 正規表現でnewTodoの文字列だけを抽出する
const extractNewTodo = (todo) => {
  // todoの文字列が(/期日: (.+?)　(.+?)/)の正規表現とマッチしているかを検査
  const dateMatch = todo.match(/期日: (.+?)　(.+?)/);
  console.log(dateMatch)
  return dateMatch ? dateMatch[2] : ''; // sateMatch[2]はnewTodoの文字部分
};

// 日付文字列を数値に変換する関数
const convertDateToNumber = (dateString) => {
  const parts = dateString.split('-');
  return parts.length === 3 ? new Date(parts[0], parts[1] - 1, parts[2]).getTime() : 0;
}

// 期日が近い順にソートするメソッド
const sortTerm = () => {
  todoList.value.sort((a, b) => {
    const dateA = convertDateToNumber(extractDate(a));
    const dateB = convertDateToNumber(extractDate(b));

    if (dateA && dateB) {
      return dateA - dateB;
    } else {
      // 期日が存在しない場合はそのままの順序を維持
      return 0;
    }
  });

  todoListComp.value.sort((a, b) => {
    const dateA = convertDateToNumber(extractDate(a));
    const dateB = convertDateToNumber(extractDate(b));

    if (dateA && dateB) {
      return dateA - dateB;
    } else {
      // 期日が存在しない場合はそのままの順序を維持
      return 0;
    }
  });
}

</script>

<template>
  <!--検索ボックス-->
  <div class="search-box">
    <input class="search" type="text" placeholder="検索" v-model="searchTerm">
  </div>
  <div class="text">
    <input type="text" class="textbox-1" placeholder="タスクの追加" v-model="newTodo" @keyup.enter="addTodo" />
    <!--文字が入力されている場合cursor: pointer 入力されていない場合 cursor: not-alloweb-->
    <button class="btn" :style="{ cursor: newTodo ? 'pointer' : 'not-allowed' }" @click="addTodo()">
      add
    </button>
  </div>
  <div class="date-sort">
    <input type="date" class="calendar" v-model="selectDate" />
    <p class="sort" @click="toggleSortMenu()">↑↓並べ替え</p>
  </div>
  <div class="sort-menu" v-if="showSortMenu">
    <h3 class="sort-h3">並べ替え</h3>
    <p class="sort-p" @click="sortAiueo()">あいうえお順</p>
    <p class="sort-p" @click="sortTerm()">期限日</p>
    <!-- 他にも必要な並び替えオプションを追加 -->
  </div>
  <TodoList :searchTerm="searchTerm" :filteredTodoCompList="filteredTodoCompList" :filteredTodoList="filteredTodoList"
    :todoList="todoList" :todoListComp="todoListComp" :saveTodoListToLocalStorage="saveTodoListToLocalStorage"
    :saveTodoListCompToLocalStorage="saveTodoListCompToLocalStorage" @updateTodoList="updateTodoList"
    @updateTodoListComp="updateTodoListComp" />
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

.sort:hover {
  background-color: #ffffff;
}

.sort-menu {
  background-color: #ffffff;
  border-radius: 5px;
  margin: 5px 70% 0 0;
  padding: 0 0 3px 0;
}

.sort-h3 {
  text-align: center;
  border-bottom: 2px solid #ebebeb;
  margin: 0;
}

.sort-p {
  cursor: pointer;
  margin: 5px 0;
  padding: 5px 0;
}

.sort-p:hover {
  background-color: #eae9e9;
}
</style>
