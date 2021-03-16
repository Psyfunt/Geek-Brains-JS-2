
export const maincartitem = {
    props: ['img', 'cartItem'],
    emits: ['changeQuantity'],
    template:` 
                     <div class="elements__product">
                        <div class="product__details">
                            <div class="details__image">
                                <picture><source :srcset="img" type="image/webp"><img class="cart-img" src="./img/Images/Shopping_cart_img_1.jpg" alt=""></picture>
                            </div>
                            <div class="details__details">
                                <div class="details__title">{{cartItem.product_name}}</div>
                                <div class="details__color">Color: <span>Red </span></div>
                                <div class="details__size">Size: <span>Xll </span></div>
                            </div>
                         </div>
                        <div class="product__unuteprice grid__align">$ {{cartItem.price}}</div>
                        <input type="number" v-model="cartItem.quantity" min="1" @change="$emit('changeQuantity', cartItem)" class="product__quantity grid__align">
                        <div class="product__shipping grid__align">FREE</div>
                        <div class="product__subtotal grid__align">$ {{cartItem.quantity * cartItem.price}}</div>
                        <div class="product__action grid__align">
                            <picture><source srcset="./img/Icons/action__icon.png" type="image/webp"><img @click.stop="$root.$refs.cart.removeProduct(cartItem)"  src="./img/Icons/action__icon.png" alt="action"></picture>
                        </div>
                    </div>
    `
};