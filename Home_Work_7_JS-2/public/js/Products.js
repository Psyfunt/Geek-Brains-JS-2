import {ProductItem} from "./ProductItem.js";

export const Products = {
    inject: ['getJson'],
    components: {
        ProductItem,

    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            catalogImg: 'https://placehold.it/150x150',
        }
    },

    methods: {
        filtration(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `
            <div class="products">
                <ProductItem 
                v-for="el of filtered" 
                :key="el.id_product"
                :img="catalogImg"
                :product="el"
                >
                </ProductItem>
            </div>
    `
};