
export const Filtration = {
    data() {
        return {
            searchLine: ''
        }
    },
    template: ` 
                <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filtration(searchLine)">
                    <input type="text" v-model="searchLine" class="search-field">
                    <button class="btn-search"  type="submit">
                    <i class="fas fa-search"></i>
                    </button>
                </form>`
};