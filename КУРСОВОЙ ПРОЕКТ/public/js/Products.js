import {ProductItem} from "./ProductItem.js";
import {Singleproduct} from "./SingleProduct.js";

export const Products = {
    inject: ['getJson'],
    components: {
        ProductItem,
        Singleproduct
    },
    props: {
        page: {
            type: String,
            default: "main"
        }
    },
    data() {
        return {
            products: [],
            pages: {
                main: `/api/products/8`,
                prod: `/api/products/9`,
                single: `/api/products/4`
            }
        }
    },
    methods:{
        addGoldenClass(i) {
            i.classList.add('golden');
            let previousElem = i.previousElementSibling;
            if (previousElem !== null && previousElem.tagName === 'I') {
               return   this.addGoldenClass(previousElem);
            }
        },
        removeGoldenClass(i) {
            i.classList.remove('golden');
            let previousElem = i.previousElementSibling;
            if (previousElem !== null && previousElem.tagName === 'I') {
               return  this.removeGoldenClass(previousElem);
            }
        }
    },
    // computed: {
    //     filtered() {
    //         return this.products.filter(el => new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name));
    //     }
    // },
    mounted() {
        this.getJson(this.pages[this.page])
            .then(data => {
                this.products = data;
            });
    },

    template:`
    <div class="content__cards">
         <ProductItem
         v-for="el of products" 
                :key="el.id_product"
                :img="el.product_image"
                :product="el"
                >
                </ProductItem>
         </div>
         
         
    `
}