<template>
    <div></div>
</template>

<script>
export default {
    name: 'Logout',
    data() {
        return {
            auth: 'https://dev.cyxapic.ru/auth/',
        }
    },
    //TODO add question for user "Are you sure?"
    created() {
        const token = localStorage.getItem('user');
        localStorage.removeItem('user');
        fetch(`${this.auth}logout/`, {
            method: 'POST',
            headers: {'Authorization': `Token ${token}`},
        }).then(resp => { 
            this.$root.$data.user = false;
            this.$root.$router.push('/');})
            .catch((error) => {
                console.log(error);
        })
    },
}
</script>
