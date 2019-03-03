<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="box">
                <h3 class="title is-3">{{title}}</h3>
                <article v-if="errorNonField" class="message is-danger">
                    <div class="message-header">
                        <p>Ошибка авторизации!</p>
                        <button @click="errorNonField=!errorNonField" class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        {{errorNonField}}
                    </div>
                </article>
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="username" class="input" type="text" placeholder="Логин">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i v-if="errUsername" class="fas fa-exclamation-triangle"></i>
                                        <i v-else class="fas fa-check"></i>
                                    </span>
                                </div>
                                <p v-for="err in errUsername" class="help is-danger">{{err}}</p>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="email" class="input" type="text" placeholder="Почта">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i v-if="errEmail" class="fas fa-exclamation-triangle"></i>
                                        <i v-else class="fas fa-check"></i>
                                    </span>
                                </div>
                                <p v-for="err in errEmail" class="help is-danger">{{err}}</p>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="password1" class="input" type="password" placeholder="Пароль">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                                <p v-for="err in errPassword1" class="help is-danger">{{err}}</p>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="password2" class="input" type="password" placeholder="Пароль еще раз">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                                <p v-for="err in errPassword2" class="help is-danger">{{err}}</p>
                            </div>
                            <div class="field">
                                <p class="control has-text-centered">
                                    <button @click="register()" class="button is-success">
                                        Создать аккаунт
                                    </button>
                                </p>
                                <p class="control has-text-centered">
                                    <router-link to="/login" class="button is-primary">Вход</router-link>
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
    name: 'Register',
    data() {
        return {
            auth: 'https://dev.cyxapic.ru/auth/',
            title: 'Регистрация:',
            username: '',
            email:'',
            password1: '',
            password2: '',
            errorNonField:'',
            errUsername: '',
            errEmail: '',
            errPassword1: '',
            errPassword2: '',
        }
    },
    methods:{
        register() {
            fetch(`${this.auth}registration/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password1: this.password1,
                    password2: this.password2,
                }),
            }).then(
                resp => resp.json().then(data => {
                    if (data.key){
                        localStorage.setItem('user', data.key);
                        this.$root.$data.user = true;
                        this.$root.$router.push('/');
                    }
                    else if (data.non_field_errors) {
                        this.errorNonField = data.non_field_errors[0];
                    } else {
                        this.errUsername = data['username'];
                        this.errEmail = data['email'];
                        this.errPassword1 = data['password1'];
                        this.errPassword2 = data['password2'];
                    }
                }).catch((error) => {
                    console.log(error);
                })
            );
        }
    },
}
</script>


    
