<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="box">
                <h3 class="title is-3">{{title}}</h3>
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <h3>{{subTitle}}</h3>
                            <p>
                               {{description}}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    mounted() {
        fetch(`${this.$api}description/`).then(
            resp => resp.json().then(jsonData => {
                this.subTitle = jsonData[0].title;
                this.description = jsonData[0].description;
            })
        );
    },
    data() {
        return {
            title: 'О магазине.',
            subTitle: '',
            description: '',
        }
    }
}
</script>
