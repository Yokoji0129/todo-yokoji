<script setup>
const props = defineProps({
    toggleMenu: Function,
    menuOpen: Boolean
});
</script>

<template>
    <div>
        <header>
            <!--検索ボックス-->
            <div class="search-box">
                <input class="search" type="text" placeholder="検索">
            </div>
            <!--メニュー欄-->
            <nav :class="{ 'open': menuOpen }" @click="closeMenu">
                <div class="hamburger-icon-menu" @click="toggleMenu()"></div>
                <RouterLink to="/" class="nav-link"><img src="../assets/sun.png" class="img" width="15">今日の予定<span class="task-number">0</span></RouterLink>
                <RouterLink to="/important" class="nav-link"><img src="../assets/star.png" class="img" width="15">重要<span class="task-number">0</span></RouterLink>
                <RouterLink to="/plan" class="nav-link"><img src="../assets/calendar-blank.png" class="img" width="15">今後の予定<span class="task-number">0</span></RouterLink>
            </nav>
        </header>
    </div>
</template>
  
<style>
.img{
    margin: 0 10px;
    padding-top: 5px;
}
header {
    background-color: #2564cf;
    padding: 5px;
}

.search-box{
    text-align: center;
    padding: 10px;
}

.search {
    padding: 7px 200px 7px 5px;
    border-radius: 10px;
    border: none;
}

.search:hover {
    background-color: #d4d2d2;
    padding: 7px 202px 7px 7px;
}

.hamburger-icon,
.hamburger-icon-menu {
    cursor: pointer;
    background-size: contain;
    width: 50px;
    height: 50px;
    background-image: url(../assets/burger.webp);
    align-self: flex-end;
    margin: 10px;
}

nav {
    position: fixed;
    top: 0;
    left: -230px;
    height: 100vh;
    width: 300px;
    background-color: #cfcdcd;
    display: flex;
    flex-direction: column;
    transition: left 0.3s ease;
}

.nav-link {
    padding: 10px;
    text-decoration: none;
    color: black;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: #d4d2d2;
}

.task-number{
    margin: 0 60px 0 0;
    float: right;
}

.open {
    left: 0;
    background-color: #ffffff;
    transition: left 0.3s ease;
}
</style>

