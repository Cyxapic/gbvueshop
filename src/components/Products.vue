<template>
    <div class="container">
        <h3 class="title is-3">{{title}}</h3>
        <div class="columns">
            <div class="column is-one-fifth">
                <nav class="panel">
                    <p class="panel-heading">
                        Категории товаров
                    </p>
                    <form class="panel-block" action='#' @submit.prevent="filterCategory(userSearch)">
                        <p class="control has-icons-left">
                            <input v-model="userSearch" class="input is-small" type="text" placeholder="Категория товара">
                            <span class="icon is-small is-left">
                                <fa-icon icon="search" />
                            </span>
                        </p>
                    </form>
                    <a v-for="category in filteredCategories"
                        :key="category.id"
                        class="panel-block"
                        @click="filterProd($event, category.id)">
                        <span class="panel-icon">
                            <fa-icon icon="code-branch" />
                        </span>
                        {{category.title}}
                    </a>
                    <div class="panel-block">
                        <button @click="filterProd($event)"
                                class="button is-link is-outlined is-fullwidth">
                            Все категории
                        </button>
                    </div>
                </nav>
            </div>
            <div class="column">
                <div class="columns is-multiline">
                    <div v-for="product in filteredProducts" :key="product.id" class="column is-multiline is-one-quarter">
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
                                    <button @click="addItem(product)" class="button is-light">В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    created() {
            fetch(`${this.api}categories/`).then(
                resp => resp.json().then(data => {
                    for (let item of data) {
                        this.categories.push(item);
                    }
                    this.filteredCategories = this.categories;
                })
            );
            fetch(`${this.api}products/`).then(
                resp => resp.json().then(data => {
                    for (let item of data) {
                        this.products.push(item);
                        this.filteredProducts.push(item);
                    }
                })
            );
        },
        mounted() {
            this.userCart = JSON.parse(localStorage.getItem('userCart'));
            this.userCart = this.userCart ? this.userCart : [];
            this.updateTotalCart();
        },
        data() {
            return {
                api: 'https://dev.cyxapic.ru/api/v1/',
                title: 'Добавте товары желаемые товары в корзину:',
                categories: [],
                filteredCategories: [],
                products: [],
                filteredProducts: [],
                userCart: [],
                userSearch: '',
                prevCatecory: '',
            }
        },
        methods: {
            filterCategory(userSearch) {
                const regexp = new RegExp(userSearch, 'i');
                this.filteredCategories = this.categories.filter(el => regexp.test(el.title));
            },
            filterProd(event, categoryId = null) {
                this.filteredCategories = this.categories;
                this.userSearch = '';
                if (!categoryId) {
                    this.filteredProducts = this.products;
                } else {
                    this.filteredProducts = this.products.filter(item => item.category === categoryId);    
                }
                this.setActiveLink(event.target);
            },
            addItem(product) {
                const itemFind = this.userCart.find((item) => product.id === item.id);
                if (itemFind) {
                    itemFind.quantity++;
                } else {
                    const item = Object.assign({
                        quantity: 1
                    }, product)
                    this.userCart.push(item);
                }
                this.updateTotalCart();
                localStorage.setItem('userCart', JSON.stringify(this.userCart));
            },
            updateTotalCart() {
                this.$root.$data.totalCart = this.userCart.reduce(
                    (resultItems, item) => (item.quantity + resultItems), 0);
            },
            setActiveLink(target) {
                if (this.prevCatecory) {
                    this.prevCatecory.classList.remove('is-active');
                }
                target.classList.add('is-active');
                this.prevCatecory = target;
            },
        },
    }
</script>
