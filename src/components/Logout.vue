<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="box">
                <h3 class="title is-3 has-text-centered">{{title}}</h3>
                <article v-if="logoutSuccess" class="media">
                    <div class="media-content">
                        <div class="content">
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-text-centered">
                                    <router-link to="/" class="button is-primary">На главную</router-link>
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
    name: 'Logout',
    data() {
        return {
            title: 'До новых встречь!',
            logoutSuccess: false,
        }
    },
    created() {
        const token = localStorage.getItem('user');
        localStorage.removeItem('user');
        fetch(`${this.$auth}logout/`, {
            method: 'POST',
            headers: {'Authorization': `Token ${token}`},
        }).then(resp => {
                if (resp.status === 200) {
                    this.logoutSuccess = true;
                    this.$root.$data.user = false;
                }
            }).catch((error) => {
               console.log(error);
        })
    },
}
</script>
