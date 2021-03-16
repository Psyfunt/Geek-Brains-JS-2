export const CartItem = {
    props: ['img', 'cartItem'],
    template: `
                  <div class="items__product">
                        <div class="product__view">
                           <img :src="img" :alt="cartItem.product_name">
                        </div>
                        <div class="product__data">
                           <div class="product__name">{{cartItem.product_name}}</div>
                           <div class="stars cart__stars" @mouseover.stop="$root.$refs.products.addGoldenClass($event.currentTarget)" 
                                        @mouseout="$root.$refs.products.removeGoldenClass($event.currentTarget)"  >
                            <i  class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                            <i   class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                        </div>
                           <div class="product__cost">{{cartItem.quantity}} x $ {{cartItem.price}}</div>
                           <div class="subTotal">{{cartItem.quantity * cartItem.price}}</div>
                         
                        </div>
                        <div class="product__status">
                           <img src="./img/Icons/action__icon.png" @click.stop="$root.$refs.cart.removeProduct(cartItem)" class="del-btn"  alt="action">
                        </div>
                     </div>
    `
};