

export const Filter = {
    data() {
        return {
            searchLine: ''
        }
    },
    // computed: {
    //     filtered() {
    //         return this.products.filter(el => new RegExp(this.searchLine, 'i').test(el.product_name));
    //     }
    // },
    template: ` 
                <form action="#" class="search-form" @submit.prevent="">
                    <input type="text" v-model="searchLine" class="search-field">
                    <button class="btn-search"  type="submit">
                    <i class="fas fa-search"></i>
                    </button>
                </form>`
};