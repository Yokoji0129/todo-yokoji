<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";

const props = defineProps({
  searchTerm: String,
  filteredTodoCompList: Array,
  filteredTodoList: Array,
  todoList: Array,
  todoListComp: Array,
  saveTodoListToLocalStorage: Function,
  saveTodoListCompToLocalStorage: Function,
});

const emits = defineEmits(["updateTodoList", "updateTodoListComp"]);

// ref を使用してローカルな変数を作成
const localTodoList = ref(props.todoList);
const localTodoListComp = ref(props.todoListComp);

// ローカルストレージからデータを読み込む
const loadTodoListFromLocalStorage = () => {
  const storedTodoList = localStorage.getItem("todoList");
  if (storedTodoList) {
    localTodoList.value = JSON.parse(storedTodoList);
  }

  const storedTodoListComp = localStorage.getItem("todoListComp");
  if (storedTodoListComp) {
    localTodoListComp.value = JSON.parse(storedTodoListComp);
  }
};

// todoを完了させるメソッド
const addCompTodo = (todo) => {
  localTodoList.value = localTodoList.value.filter((item) => item !== todo);
  localTodoListComp.value.push(todo);
  saveTodoListToLocalStorage();
  saveTodoListCompToLocalStorage();
};

// 完了済みから未完了にtodoを移動させる
const addInCompTodo = (todo) => {
  localTodoListComp.value = localTodoListComp.value.filter(
    (item) => item !== todo
  );
  localTodoList.value.push(todo);
  saveTodoListToLocalStorage();
  saveTodoListCompToLocalStorage();
};

// 未完了todoから削除
const deleteTodo = (index) => {
  localTodoList.value.splice(index, 1);
  saveTodoListToLocalStorage();
};

// 完了済みtodoから削除
const deleteTodoComp = (index) => {
  localTodoListComp.value.splice(index, 1);
  saveTodoListCompToLocalStorage();
};

// ローカルストレージに未完了todoを保存
const saveTodoListToLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(localTodoList.value));
};

// ローカルストレージに完了済みtodoを保存
const saveTodoListCompToLocalStorage = () => {
  localStorage.setItem("todoListComp", JSON.stringify(localTodoListComp.value));
};

// 監視して親コンポーネントに更新を通知
watch(localTodoList, (newValue) => {
  emits("updateTodoList", newValue);
});

watch(localTodoListComp, (newValue) => {
  emits("updateTodoListComp", newValue);
});

// コンポーネントがマウントされた時にローカルストレージからデータを読み込む
onMounted(() => {
  loadTodoListFromLocalStorage();
});
</script>


<template>
  <div v-if="searchTerm.length">
    <h1>{{ searchTerm }} を検索中</h1>
  </div>
  <div
    v-if="searchTerm.length && filteredTodoList.length === 0 && filteredTodoCompList.length === 0"
  >
    <h1 class="h1">検索結果なし</h1>
  </div>
  <div>
    <h1 v-if="searchTerm.length === 0 && localTodoList.length === 0 && localTodoListComp.length === 0">
      ToDoを追加してください
    </h1>
    <div>
      <h3 v-if="localTodoList.length">未完了({{ localTodoList.length }})</h3>
      <ul class="ul">
        <li class="li" v-for="(todo, i) in filteredTodoList" :key="i">
          <p class="heading-23">{{ todo }}</p>
          <button class="btn" @click="addCompTodo(todo)">完了</button>
          <button class="btn-delete" @click="deleteTodo(i)">削除</button>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="h3" v-if="localTodoListComp.length">
        完了済み({{ localTodoListComp.length }})
      </h3>
      <ul class="ul">
        <li class="li" v-for="(todoComp, i) in filteredTodoCompList" :key="i">
          <p class="heading-23">{{ todoComp }}</p>
          <button class="btn-incomp" @click="addInCompTodo(todoComp)">
            未完
          </button>
          <button class="btn-delete" @click="deleteTodoComp(i)">削除</button>
        </li>
      </ul>
    </div>
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
h1 {
  text-align: center;
}
.h1 {
  color: #2589d0;
  background-color: #f2f2f2;
  text-align: center;
}
p {
  margin: 0;
}
.h3 {
  margin: 0;
}
.ul {
  margin: 30px 0;
}
ul li {
  list-style: none;
  margin: 0 60px 10px 0;
}

.li {
  display: flex;
}

.btn {
  background-color: rgb(197, 255, 192);
  border-bottom: 3px solid #d2d2d2;
  padding: 0 30px;
  border-top: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(167, 213, 163);
}
.btn-delete {
  background-color: rgb(255, 192, 192);
  border-bottom: 3px solid #d2d2d2;
  padding: 0 30px;
  border-top: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
}
.btn-delete:hover {
  background-color: rgb(219, 165, 165);
}

.btn-incomp {
  background-color: rgb(192, 217, 255);
  border-bottom: 3px solid #d2d2d2;
  padding: 0 30px;
  border-top: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
}
.btn-incomp:hover {
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
  border-bottom: 3px solid #d2d2d2;
}
</style>