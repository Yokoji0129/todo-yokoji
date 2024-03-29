<script setup>
import NowSearch from "./NowSearch.vue";
import NotSearch from "./NotSearch.vue";
import NotTodo from "./NotTodo.vue";
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

// memoをデータに保存
const emits = defineEmits(["updateTodoList", "updateTodoListComp"]);

// ローカルな変数を作成して子コンポーネントで操作できるように変更
const localTodoList = ref(props.todoList);
const localTodoListComp = ref(props.todoListComp);

const memos = ref({}); // メモをオブジェクトで保存させる

const saveMemoToLocalStorage = () => {
  localStorage.setItem("memos", JSON.stringify(memos.value));
};

// ローカルストレージからメモを読み込む
const loadMemoFromLocalStorage = () => {
  const storedMemos = localStorage.getItem("memos");
  if (storedMemos) {
    memos.value = JSON.parse(storedMemos);
  }
};

// ローカルストレージからデータを読み込む
const loadTodoListFromLocalStorage = () => {
  // 未完了データ
  const storedTodoList = localStorage.getItem("todoList");
  if (storedTodoList) {
    localTodoList.value = JSON.parse(storedTodoList);
  }

  // 完了済みデータ
  const storedTodoListComp = localStorage.getItem("todoListComp");
  if (storedTodoListComp) {
    localTodoListComp.value = JSON.parse(storedTodoListComp);
  }

  // メモデータ
  const storedMemos = localStorage.getItem("memos");
  if (storedMemos) {
    memos.value = JSON.parse(storedMemos);
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
  const deletedTodo = localTodoList.value[index];
  localTodoList.value.splice(index, 1);
  deleteMemo(deletedTodo); // ToDoが削除されたらメモも削除
  saveTodoListToLocalStorage();
};

// 完了済みtodoから削除
const deleteTodoComp = (index) => {
  const deletedTodo = localTodoListComp.value[index];
  localTodoListComp.value.splice(index, 1);
  deleteMemo(deletedTodo); // ToDoが削除されたらメモも削除
  saveTodoListCompToLocalStorage();
};

// メモを削除するメソッド
const deleteMemo = (todo) => {
  if (memos.value.hasOwnProperty(todo)) {
    delete memos.value[todo];
    saveMemoToLocalStorage();
  }
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

// 監視して親コンポーネントに更新を通知
watch(localTodoListComp, (newValue) => {
  emits("updateTodoListComp", newValue);
});

// コンポーネントがマウントされた時にローカルストレージからデータを読み込む
onMounted(() => {
  loadTodoListFromLocalStorage();
  loadMemoFromLocalStorage();
});

const menus = ref({}); // 各ToDoアイテムごとのメニューを保持するオブジェクト

// 未完了側のメニューをトグルするメソッド
const toggleMenu = (todo) => {
  // 他のToDoアイテムのメニューを閉じる
  Object.keys(menus.value).forEach((item) => {
    if (item !== todo) {
      menus.value[item] = false;
    }
  });

  // 選択されたToDoアイテムのメニューをトグル
  menus.value[todo] = !menus.value[todo];
};

// 完了済み側のメニューをトグルするメソッド
const toggleMenuComp = (todoComp) => {
  // 他のToDoアイテムのメニューを閉じる
  Object.keys(menus.value).forEach((item) => {
    if (item !== todoComp) {
      menus.value[item] = false;
    }
  });

  // 選択されたToDoアイテムのメニューをトグル
  menus.value[todoComp] = !menus.value[todoComp];
};

const toggleCategory = ref(false)

const toggleCategoryMenu = () => {
  toggleCategory.value = !toggleCategory.value;
}

const toggleCategoryRed = ref(false)
const categoryRedBtn = () => {
  toggleCategoryRed.value = !toggleCategoryRed.value;
}
const toggleCategoryBlue = ref(false)
const categoryBlueBtn = () => {
  toggleCategoryBlue.value = !toggleCategoryBlue.value;
}
const toggleCategoryGreen = ref(false)
const categoryGreenBtn = () => {
  toggleCategoryGreen.value = !toggleCategoryGreen.value;
}
</script>


<template>
  <!--todoを検索するときに表示-->
  <NowSearch :searchTerm="searchTerm" />
  <!--検索結果が0の時のデザイン-->
  <NotSearch :searchTerm="searchTerm" :filteredTodoList="filteredTodoList" :filteredTodoCompList="filteredTodoCompList" />
  <div>
    <!--Todoが0件の時に表示-->
    <NotTodo :searchTerm="searchTerm" :localTodoList="localTodoList" :localTodoListComp="localTodoListComp" />

    <!--未完了リスト-->
    <div>
      <h3 v-if="localTodoList.length">未完了({{ localTodoList.length }})</h3>
      <ul class="ul">
        <li class="li" v-for="(todo, i) in filteredTodoList" :key="i" @click="toggleMenu(todo)">
          <p class="heading-23">{{ todo }}</p>
          <button class="btn" @click="addCompTodo(todo)" @click.stop="">
            完了
          </button>
          <button class="btn-delete" @click="deleteTodo(i)" @click.stop="">
            削除
          </button>
          <!-- ToDoアイテムごとに異なるメニュー -->
          <nav :class="{ open: menus[todo] }" @click.stop="">
            <h1 class="close-h1" @click="toggleMenu(todo)">閉じる</h1>
        <li>
          <p class="p">{{ todo }}</p>
        </li>
        <input class="memo" type="textearea" placeholder="メモの追加" v-model="memos[todo]"
          @keyup.enter="saveMemoToLocalStorage(todo)" />
        <button class="memo-btn" @click="saveMemoToLocalStorage(todo)">
          メモを保存
        </button>
        <!--カテゴリーメニュー-->
        <div>
          <p class="category-red" v-if="toggleCategoryRed">Red Category<span class="category-btn">✕</span></p>
          <p class="category-blue" v-if="toggleCategoryBlue">Blue Category<span class="category-btn">✕</span></p>
          <p class="category-green" v-if="toggleCategoryGreen">Green Category<span class="category-btn">✕</span></p>
          <p class="category" @click="toggleCategoryMenu">カテゴリーを追加</p>
          <ul class="category-menu" v-if="toggleCategory">
            <li @click="categoryRedBtn()"><p class="category-p-red">〇</p><span><p>Red Category</p></span></li>
            <li @click="categoryBlueBtn()"><p class="category-p-blue">〇</p><span><p>Blue Category</p></span></li>
            <li @click="categoryGreenBtn()"><p class="category-p-green">〇</p><span><p>Green Category</p></span></li>
          </ul>
        </div>
        <!--タスク完了ボタン-->
        <button class="menu-comp-btn" @click="addCompTodo(todo)" @click.stop="">
          完了
        </button>
        <!--タスク削除ボタン-->
        <button class="menu-btn-delete" @click="deleteTodo(i)" @click.stop="">
          削除
        </button>
        </nav>
        </li>
      </ul>
    </div>

    <!--完了済みリスト-->
    <div>
      <h3 class="h3" v-if="localTodoListComp.length">
        完了済み({{ localTodoListComp.length }})
      </h3>
      <ul class="ul">
        <li class="li" v-for="(todoComp, i) in filteredTodoCompList" :key="i" @click="toggleMenuComp(todoComp)">
          <p class="heading-23">{{ todoComp }}</p>
          <button class="btn-incomp" @click="addInCompTodo(todoComp)" @click.stop="">
            未完
          </button>
          <button class="btn-delete" @click="deleteTodoComp(i)" @click.stop="">
            削除
          </button>
          <!-- ToDoアイテムごとに異なるメニュー -->
          <nav :class="{ open: menus[todoComp] }" @click.stop="">
            <h1 class="close-h1" @click="toggleMenuComp(todoComp)">閉じる</h1>
        <li>
          <p class="p">{{ todoComp }}</p>
        </li>
        <input class="memo" type="textearea" placeholder="メモの追加" v-model="memos[todoComp]"
          @keyup.enter="saveMemoToLocalStorage(todo)" />
        <button @click="saveMemoToLocalStorage(todoComp)">
          メモを保存
        </button>
        <button class="menu-incomp-btn" @click="addInCompTodo(todoComp)" @click.stop="">
          未完了に戻す
        </button>
        <button class="menu-btn-delete" @click="deleteTodoComp(i)" @click.stop="">
          削除
        </button>
        </nav>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
nav {
  padding: 10px;
  position: fixed;
  top: 60px;
  right: -330px;
  height: 100vh;
  width: 300px;
  background-color: #faf9f8;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.open {
  right: 0;
  background-color: #faf9f8;
  transition: 0.3s;
}

.heading-23 {
  padding: 15px 10px;
  width: 100%;
  border-left: 5px solid #2589d0;
  border-bottom: 3px solid #d2d2d2;
  background-color: #f2f2f2;
  color: #333333;
  cursor: pointer;
}

.heading-23:hover {
  background-color: #d4d4d4;
}

.close-h1 {
  background-color: #2589d0;
  color: white;
  cursor: pointer;
}

p {
  margin: 0;
}

.p {
  margin: 5px;
  font-weight: bold;
  background-color: #ffffff;
  padding: 10px 20px;
  width: 100%;
  border-radius: 10px;
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

.memo {
  padding-bottom: 60px;
  font-size: 16px;
}

.memo-btn{
  margin-bottom: 15px;
  cursor: pointer;
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

.category {
  text-align: center;
  background-color: #ffffff;
  padding: 10px;
  cursor: pointer;
  margin: 0;
}

.menu-comp-btn {
  margin: 15px 0 0 0;
  padding: 10px;
  background-color: rgb(197, 255, 192);
  border: none;
  cursor: pointer;
}

.menu-comp-btn:hover {
  background-color: rgb(167, 213, 163);
}

.menu-incomp-btn {
  margin: 15px 0 0 0;
  padding: 10px;
  background-color: rgb(192, 217, 255);
  border: none;
  cursor: pointer;
}

.menu-incomp-btn:hover {
  background-color: rgb(166, 188, 220);
}

.menu-btn-delete {
  margin: 15px 0 0 0;
  padding: 10px;
  background-color: rgb(255, 192, 192);
  border: none;
  cursor: pointer;
}

.menu-btn-delete:hover {
  background-color: rgb(219, 165, 165);
}

.category-red{
  background-color: #fce9ea;
  text-align: center;
}

.category-blue{
  background-color: #e0f7fd;
  text-align: center;
}
.category-green{
  background-color: #e9f9e8;
  text-align: center;
}

.category-btn{
  cursor: pointer;
  margin-left: 5px;
}

.category-menu{
  background-color: #ffffff;
  padding: 0;
}

.category-menu li{
  margin: 0;
  padding: 3px 5px;
  display: flex;
}
.category-menu li:hover{
  background-color: #f2f2f2;
}

.category-p-red{
  color: red;
  font-weight: bold;
}
.category-p-blue{
  color: blue;
  font-weight: bold;
}
.category-p-green{
  color: green;
  font-weight: bold;
}
</style>