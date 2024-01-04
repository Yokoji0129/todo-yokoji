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
    padding: 7px;
}

.search {
    padding: 10px 200px 10px 5px;
    border-radius: 10px;
    border: none;
    transition: 0.3s;

}

.search:hover {
    background-color: #d4d2d2;
    transform: scale(1.02);
}

.search:focus {
    outline: none;
}

.hamburger-icon,
.hamburger-icon-menu {
    cursor: pointer;
    background-size: contain;
    width: 50px;
    height: 50px;
    background-image: url(../assets/bars_hoso.png);
    align-self: flex-end;
    margin: 10px;
    transition: 0.3s;
}

.hamburger-icon:hover,
.hamburger-icon-menu:hover {
    transform: scale(1.1);
    transition: 0.3s ease;
}

.hamburger-icon:focus,
.hamburger-icon-menu:focus {
    outline: none;
}
nav {
    position: fixed;
    top: 60px;
    left: -230px;
    height: 100vh;
    width: 300px;
    background-color: #d4d2d2;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.nav-link {
    padding: 10px;
    text-decoration: none;
    color: black;
    transition: 0.3s;
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
    transition: 0.3s;
}
</style>

