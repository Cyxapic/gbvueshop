<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="box">
                <h3 class="title is-3">{{title}}</h3>
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <div class="field">
                                <p>
                                    Пользователь: {{userName}}
                                </p>
                            </div>
                            <div class="field">
                                <p v-if="!editLastNameFlag" @click="editLastNameFlag=!editLastNameFlag">
                                    Фамилия: {{lastName}} <fa-icon icon="pen" />
                                </p>
                                <p v-else>
                                    <input @keyup.enter="editLastName()" v-model="lastName" class="input" type="text" placeholder="Фамилия">
                                </p>
                            </div>
                            <div class="field">
                                <p v-if="!editFirstNameFlag" @click="editFirstNameFlag=!editFirstNameFlag">
                                    Имя: {{firstName}} <fa-icon icon="pen" />
                                </p>
                                <p v-else>
                                    <input @keyup.enter="editFirstName()" v-model="firstName" class="input" type="text" placeholder="Имя">
                                </p>
                            </div>
                            <div class="field">
                                <p>
                                    Почта: {{email}}
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
    name: 'Profile',
    data() {
        return {
            auth: 'https://dev.cyxapic.ru/auth/',
            title: 'Ваш профиль:',
            userName: '',
            email: '',
            firstName: '',
            lastName:'',
            editLastNameFlag: false,
            editFirstNameFlag: false,
        }
    },
    created() {
        const token = localStorage.getItem('user');
        fetch(`${this.auth}user/`, {
            method: 'GET',
            headers: {'Authorization': `Token ${token}`},
        }).then(
            resp => resp.json().then(data => {
                this.userDataParse(data);
            }).catch((error) => {
                console.log(error);
            })
        );
    },
    methods: {
        userDataParse(data) {
                this.userName = data.username;
                this.lastName = data.last_name ? data.last_name : 'Not set ...';
                this.firstName = data.first_name ? data.first_name : 'Not set ...';
                this.email = data.email;
        },
        editLastName(){
            this.editLastNameFlag = false;
            this.update({'last_name': this.lastName});
        },
        editFirstName(){
            this.editFirstNameFlag = false;
            this.update({'first_name': this.firstName});
        },
        update(data) {
            const token = localStorage.getItem('user');
            fetch(`${this.auth}user/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(data),
            }).then(
                resp => resp.json().then(data => {
                    this.userDataParse(data);
                }).catch((error) => {
                    console.log(error);
                })
            );
        },
    },
}
</script>
    