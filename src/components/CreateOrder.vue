<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="box">
                <h3 class="title is-3">{{title}}</h3>
                <article class="media">
                    <div class="media-content">
                        <div v-if="!orederCreated" class="content">
                            <table  class="table is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Наименование товара</th>
                                        <th>Количество в заказе</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item of userCart" :key="item.pk">
                                        <td>{{item.title}}</td>
                                        <td>{{item.quantity}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="field">
                                <p>
                                    <button @click="createOrder()" class="button is-primary">Создать заказ</button>
                                </p>
                            </div>
                        </div>
                        <div v-else class="content">
                            {{orederCreated}}
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
            title: 'Создание заказа:',
            userCart: [],
            orederCreated: '',
        }
    },
    created() {
        this.getUserCart();
    },
    methods: {
        getUserCart() {
            this.userCart = JSON.parse(localStorage.getItem('userCart'));
            this.userCart = this.userCart ? this.userCart : [];
        },
        getUserGoods() {
            const userGoods = [];
            for (const item of this.userCart){
                let goods = {
                    id: item.id,
                    quantity: item.quantity
                }
                userGoods.push(goods);
            }
            return userGoods;
        },
        createOrder() {
            const token = localStorage.getItem('user');
            fetch(`${this.$api}orders/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(this.getUserGoods())
            }).then(
                resp =>{
                    if (resp.status === 201) {
                        localStorage.removeItem('userCart');
                        this.orederCreated = 'Заказ создан!';
                    } else {
                        this.orederCreated = 'Что то пошло не так ...';
                    }
                }).catch((error) => {
                    console.log(error);
            });
        }
    },
}
</script>
    