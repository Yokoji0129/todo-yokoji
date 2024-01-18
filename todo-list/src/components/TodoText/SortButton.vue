<script setup>
const props = defineProps({
    showSortMenu: Boolean,
    todoList: Array,
    todoListComp: Array
})

// 正規表現でnewTodoの文字列だけを抽出する
const extractNewTodo = (todo) => {
  // todoの文字列が(/期日: (.+?)　(.+?)/)の正規表現とマッチしているかを検査
  const dateMatch = todo.match(/期日: (.+?)　(.+?)/);
  return dateMatch ? dateMatch[2] : ''; // sateMatch[2]はnewTodoの文字部分
};

const sortAiueo = () => {
  props.todoList.sort((a, b) => {
    // "期日: " の部分だけを取り出して比較
    const todoA = extractNewTodo(a);
    const todoB = extractNewTodo(b);
    return todoA.localeCompare(todoB);
  });
  props.todoListComp.sort((a, b) => {
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

// 日付文字列を数値に変換する関数
const convertDateToNumber = (dateString) => {
  const parts = dateString.split('-');
  return parts.length === 3 ? new Date(parts[0], parts[1] - 1, parts[2]).getTime() : 0;
}

// 期日が近い順にソートするメソッド
const sortTerm = () => {
  props.todoList.sort((a, b) => {
    const dateA = convertDateToNumber(extractDate(a));
    const dateB = convertDateToNumber(extractDate(b));

    if (dateA && dateB) {
      return dateA - dateB;
    } else {
      // 期日が存在しない場合はそのままの順序を維持
      return 0;
    }
  });

  props.todoListComp.sort((a, b) => {
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
    <div class="sort-menu" v-if="showSortMenu">
        <h3 class="sort-h3">並べ替え</h3>
        <p class="sort-p" @click="sortAiueo()">あいうえお順</p>
        <p class="sort-p" @click="sortTerm()">期限日</p>
        <!-- 他にも必要な並び替えオプションを追加 -->
    </div>
</template>

<style scoped>

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