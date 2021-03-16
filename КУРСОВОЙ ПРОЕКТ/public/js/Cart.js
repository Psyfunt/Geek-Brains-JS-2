import {CartItem} from "./CartItem.js";
import {maincartitem} from "./MainCartItem.js";

export const Cart = {
    inject: ['getJson', 'putJson', 'postJson', 'deleteJson'],
    components: {
        CartItem,
        maincartitem
    },
    props: {
        sizecart: {
            type: String,
            default: "small"
        }
    },
    data() {
      return {
          // cartItems: [],
          totalCost: 0,
          isVisibleCart: false,

      }
    },

    computed:{
         calcSum() {
            return this.totalCost =  this.$root.cartItems.reduce((accum, item) => accum += item.price * item.quantity, 0);
        }
    },
    methods: {
        changeQuantity(product) {
            this.putJson(`/api/cart/${product.id_product}`, { quantity: +product.quantity, inp:true})
                .then(data => {
                    if (data.result) {
                        return +product.quantity;
                    }
                });
        },
        clear() {
            this.deleteJson(`/api/cart/`)
                .then(data => {
                    if (data.result) {
                        this.cartItems = [];
                    }
                });
        },

        addProduct(product){
            let find = this.$root.cartItems.find(el => el.id_product === product.id_product);
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
                            this.$root.cartItems.push(prod);
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
                            this.$root.cartItems.splice(this.$root.cartItems.indexOf(product), 1)
                        }
                    })
            }
        },
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.$root.cartItems.push(el);
                }
            });

    },
    template:
    `
               <div v-if = "sizecart ==='small'" class="personals__cart" @click="isVisibleCart = !isVisibleCart"  >
               <a href="#"><img src="img/Icons/cart_icon.png" alt="cart"></a>
               <div class="personals__dropdown" v-show="isVisibleCart"  >
                  <div class="dropdown__items"  >
                  <span v-if="!this.$root.cartItems.length">Корзина пуста</span>
                  <CartItem
                    v-for="item of this.$root.cartItems"
                    :key="item.id_product"
                    :img="item.product_image"
                    :cartItem="item"                  
                  ></CartItem>
                     <div class="items__total">
                        <span>TOTAL </span>
                        <span>{{this.calcSum}}</span>
                     </div>
                     <a href="../Checkout.html" class="items__btn checkout">Checkout</a>
                     <a href="../shoppingCart.html" class="items__btn go-to-cart">Go to cart</a>
                  </div>
               </div>
            </div>
            
            
            <section v-if = "sizecart === 'big'" class="shopping-cart container">
                            <div class="shopping-cart__titles">
                                <div class="titles__details">Product Details</div>
                                <div class="titles__price grid__align">unite Price</div>
                                <div class="titles__quantity grid__align">Quantity</div>
                                <div class="titles__shipping grid__align">shipping</div>
                                <div class="titles__subtotal grid__align">Subtotal</div>
                                <div class="titles__action grid__align">ACTION</div>
                            </div>
                            <div class="shopping-cart__elements">
                            <span v-if="!this.$root.cartItems.length">Корзина пуста</span>
                              <maincartitem
                                v-for="item of this.$root.cartItems" 
                                :key="item.id_product"
                                :img="item.product_image"
                                :cartItem="item"
                                @changeQuantity="changeQuantity"
                               
                              ></maincartitem>
                            </div>
                            <div class="shopping-cart__navigation">
      <div class="navigation__button">
         <a @click="clear">cLEAR SHOPPING CART</a>
      </div>
      <div class="navigation__button">
         <a href="../products.html">cONTINUE sHOPPING</a>
      </div>
   </div>
                            <div class="shopping-cart__details">
      <div class="details__adress">
         <form class="adress__form" action="#">
            <label class="form__label" for="">Shipping Adress
               <select name="" id="">
                  <option value="">Bangladesh</option>
                  <option value="">Russia</option>
                  <option value="">China</option>
               </select>
               <input type="text" placeholder="State">
               <input type="text" placeholder="Postcode/Zip">
            </label>
            <button>get a quote</button>
         </form>
      </div>
      <div class="details__discount">
         <div class="discount__title">coupon discount</div>
         <div class="discount__subtitle">Enter your coupon code if you have one</div>
         <form class="discount__form" action="#">
            <input type="text" placeholder="State">
            <button>Apply coupon</button>
         </form>
      </div>
      <div class="details__total">
         <div class="total__sub">Sub total $ {{this.calcSum}}</div>
         <div class="total__grand">GRAND TOTAL <span>$ {{this.calcSum}}</span></div>
         <div class="total__button">
            <a href="../Checkout.html">proceed to checkout</a>
         </div>
      </div>
   </div>
                          </section>


`

};