import {CartItem} from "./CartItem.js";

export const Cart = {
    inject: ['getJson', 'putJson', 'postJson', 'deleteJson'],
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
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        removeProduct(product){
            if(product.quantity > 1) {
                this.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            product.quantity--;
                        }
                    })
            } else {
                this.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if(data.result){
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    })
            }
        },
    },
    mounted() {
        this.getJson(`/api/cart`)
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