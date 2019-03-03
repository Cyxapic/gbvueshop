<template>
   <div class="container">
        <h3 class="title is-3">{{title}}</h3>
        <div v-if="totalPrice" class="notification level">
            <div class="level-left">
                Всего на сумму: <strong>{{totalPrice}}</strong>
            </div>
            <div class="level-right">
                <router-link v-if="$root.$data.user" to="/order-create" class="button is-primary">Оформить заказ</router-link>
            </div>
        </div>
        <div class="columns is-multiline">
            <div  v-for="product in userCart" :key="product.id" class="column is-multiline is-one-quarter">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="product.img" alt="Product image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <p><strong>Наименование:</strong> {{product.title}}</p>
                            <p><strong>Цена:</strong> {{product.price}}</p>
                            <p><strong>Количество:</strong> {{product.quantity}}</p>
                            <button @click="delItem(product)" class="button is-light">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'Cart',
    mounted() {
        this.userCart = JSON.parse(localStorage.getItem('userCart'));
        this.userCart = this.userCart ? this.userCart : [];
        this.updateTotalCart();
    },
    computed: {
        title() {
            if (this.userCart.length === 0) {
                return 'Ваша корзина пуста!';
            }
            return 'Ваша корзина:';
        },
        totalPrice() {
            return this.userCart.reduce((resultPrice, item) => (+item.price * +item.quantity) + resultPrice, 0);
        }
    },
    data() {
        return {
            userCart: [],
        }
    },
    methods: {
        delItem(product) {
            const itemFind = this.userCart.find((item) => product.id === item.id);
            if (itemFind.quantity > 1) {
                itemFind.quantity--;
            } else {
                this.userCart.splice(this.userCart.indexOf(product), 1);
            }
            this.updateTotalCart();
            localStorage.setItem('userCart', JSON.stringify(this.userCart));
        },
        updateTotalCart() {
            this.$root.$data.totalCart = this.userCart.reduce(
                (resultItems, item) => (item.quantity + resultItems), 0);
        },
    }
}
</script>
