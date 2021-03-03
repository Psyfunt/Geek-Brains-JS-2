import {ProductItem} from "./ProductItem.js";

export const Products = {
    inject: ['API', 'request'],
    components: {
        ProductItem
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            catalogImg: 'https://placehold.it/150x150',
        }
    },
    // computed: {
    //     filtered() {
    //         return this.products.filter(el => new RegExp(this.searchLine, 'i').test(el.product_name));
    //     }
    // },

    mounted() {
        this.request(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    template: `
            <div class="products">
                <ProductItem 
                v-for="el of products" 
                :key="el.id_product"
                :img="catalogImg"
                :product="el"
                >
                </ProductItem>
            </div>
    `
};