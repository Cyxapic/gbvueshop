<template>
  <div id="app">
    <header class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="#/">
                <img src="./assets/logo.jpg" width="45" height="120">
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Главная</router-link>
                <router-link to="/about" class="navbar-item">О магазине</router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Контакты
                    </a>
                    <div class="navbar-dropdown">
                        <div class="navbar-item">Контакты (ПУСТО)</div>
                        <div class="navbar-item">Напишети нам(ПУСТО)</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <a class="navbar-item">
                    Товаров в корзине: <span class="tag is-success">{{$root.$data.totalCart}}</span>
                </a>
                <div class="buttons">
                    <router-link to="/cart" class="button is-primary">Козрзина</router-link>
                    <router-link v-if="!$root.$data.user" to="/login" class="button is-light">Вход</router-link>
                    <router-link v-if="$root.$data.user" to="/profile" class="button is-light">Профиль</router-link>
                    <router-link v-if="$root.$data.user" to="/logout" class="button is-light">Выход</router-link>
                </div>
            </div>
        </div>
      </nav>
    </header>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
}
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css";
</style>
