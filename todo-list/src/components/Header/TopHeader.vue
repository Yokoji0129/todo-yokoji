<script setup>
const props = defineProps({
    toggleMenu: Function,
    menuOpen: Boolean
});
</script>

<template>
    <div>
        <header>
            <div class="top">
                <!--画面左上のテキスト-->
                <h3 class="header-text">ToDo</h3>
            </div>
            <!--メニュー欄-->
            <nav :class="{ 'open': menuOpen }" @click="closeMenu">
                <!--メニューアイコン-->
                <div class="hamburger-icon-menu" @click="toggleMenu()"></div>
                <!--メニュー1-->
                <RouterLink to="/" class="nav-link" :class="{ 'active-link': menuOpen && $route.path === '/' }">
                    <!--バーガーメニューが開かれているときだけactive-link スタイル適応-->
                    <img src="../../assets/img/menu_ico/sun.png" class="img" width="15">
                    今日の予定
                    <span class="task-number">
                        0
                    </span>
                </RouterLink>
                <!--メニュー2-->
                <RouterLink to="/important" class="nav-link"
                    :class="{ 'active-link': menuOpen && $route.path === '/important' }">
                    <img src="../../assets/img/menu_ico/star.png" class="img" width="15">
                    重要
                    <span class="task-number">
                        0
                    </span>
                </RouterLink>
                <!--メニュー3-->
                <RouterLink to="/plan" class="nav-link" :class="{ 'active-link': menuOpen && $route.path === '/plan' }">
                    <img src="../../assets/img/menu_ico/calendar-blank.png" class="img" width="15">
                    今後の予定
                    <span class="task-number">
                        0
                    </span>
                </RouterLink>
                <!--メニュー4-->
                <RouterLink to="/all" class="nav-link" :class="{ 'active-link': menuOpen && $route.path === '/all' }">
                    <img src="../../assets/img/menu_ico/house.png" class="img" width="15">
                    タスク
                    <span class="task-number">
                        0
                    </span>
                </RouterLink>
            </nav>
        </header>
    </div>
</template>
  
<style scoped>
.active-link {
    border-left: 2px solid #2564cf;
    background-color: #eff6fc;
    color: black;
    /* アクティブなリンクのテキスト色 */
}

.img {
    margin: 0 10px;
    padding-top: 5px;
}

header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #2564cf;
    padding: 5px;
    z-index: 1000;
}

.top {
    display: flex;
    justify-content: space-between;
    /* 左右中央に配置 */
    align-items: center;
    /* 上下中央に配置 */
}

.header-text {
    margin-right: auto;
    /* 右寄せ */
    color: white;
    /* テキストの色 */
    margin: 10px;
}

.search-box {
    margin: 0 20px;
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

.hamburger-icon,
.hamburger-icon-menu {
    cursor: pointer;
    background-size: contain;
    width: 50px;
    height: 50px;
    background-image: url(../../assets/img/menu_ico/bars_hoso.png);
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
    background-color: #ebebeb;
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

.nav-link-dark {
    padding: 10px;
    text-decoration: none;
    color: black;
    transition: 0.3s;
}

.nav-link:hover {
    background-color: #ebebeb;
}

.task-number {
    margin: 0 60px 0 0;
    float: right;
}

.open {
    left: 0;
    background-color: #ffffff;
    transition: 0.3s;
}
</style>
