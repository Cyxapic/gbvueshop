<template>
    <div class="columns">
        <div class="column">
            <table class="table is-hoverable">
                <thead>
                    <tr>
                        <th>Дата заказа</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order of orders" :key="order.pk">
                        <td>{{order.created}}</td>
                        <td>{{order.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Orders',
        data() {
            return {
                orders: [],
            }
        },
        created() {
            const token = localStorage.getItem('user');
            fetch(`${this.$api}orders/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                },
            }).then(
                resp => resp.json().then(data => {
                    for (let order of data) {
                        this.orders.push(order);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            );
        }
    }
</script>

<style scoped>
    table{
        margin: auto;
    }
</style>
