<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="box">
                <h3 class="title is-3">{{title}}</h3>
                <article v-if="error" class="message is-danger">
                    <div class="message-header">
                        <p>Ошибка авторизации!</p>
                        <button @click="error=!error"  class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        {{error}}
                    </div>
                </article>
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input v-model="userName" class="input" type="text" placeholder="Логин">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input v-model="password" class="input" type="password" placeholder="Пароль">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-text-centered">
                                    <button @click="login()" class="button is-success">
                                        Вход
                                    </button>
                                </p>
                                <p class="control has-text-centered">
                                    <router-link to="/register" class="button is-primary">Создать аккаунт</router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            title: 'Вход:',
            userName: '',
            password: '',
            error: '',
        }
    },
    methods: {
        validate() {
            if(!this.userName || !this.password){
                this.error = 'Указаны не все данные!'
                return false;    
            }
            return true;
        },
        login() {
            if (!this.validate()){return}
            fetch(`${this.$auth}login/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.userName,
                    password: this.password,
                }),
            }).then(
                resp => resp.json().then(data => {
                    if (data.non_field_errors) {
                        this.error = data.non_field_errors[0];
                    } else {
                        localStorage.setItem('user', data.key);
                        this.$root.$data.user = true;
                        this.$root.$router.push('/');
                    }
                }).catch((error) => {
                    console.log(error);
                })
            );
        }
    },
}
</script>
