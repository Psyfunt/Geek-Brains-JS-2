import {CartItem} from "./CartItem.js";

export const Cart = {
    inject: ['API', 'request'],
    components: {
        CartItem
    },
    data() {
      return {
          cartItems: [],
          cartImg: 'https://placehold.it/50x50',
          isVisibleCart: false,
          cartUrl: '/getBasket.json',
      }
    },
    methods: {
        addProduct(product) {
            this.request(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                            return;
                        }
                        let prod = Object.assign({quantity: 1}, product);
                        this.cartItems.push(prod);
                    } else {
                        throw new Error('ERROR');
                    }
                })
        },
        removeProduct(product) {
            this.request(`${this.API}/deleteFromBasket1.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                            return;
                        }
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    } else {
                        throw new Error('ERROR');
                    }
                })
        },
    },
    mounted() {
        this.request(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
    <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
                <div class="cart-body" v-show="isVisibleCart">
                    <span v-if="!cartItems.length">Корзина пуста</span>
                    <CartItem 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :img="cartImg"
                    :cartItem="item"
                    @removeProduct="removeProduct"
                    ></CartItem>
                </div>`

};