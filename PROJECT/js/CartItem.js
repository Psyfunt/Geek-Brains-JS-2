export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['removeProduct'],
    template: `  <div class="cart__product">
                    <div class="product__info">
                        <img :src="img" :alt="cartItem.product_name">
                        <div class="product__description">
                            <div class="product__title">{{cartItem.product_name}}</div>
                            <div class="product__amount">Amount: {{cartItem.quantity}}</div>
                            <div class="product__price">{{cartItem.price}} 1 шт.</div>
                        </div>
                    </div>
                    <div class="subTotal">{{cartItem.quantity * cartItem.price}}</div>
                    <img src="img/action_icon.png" @click="$emit('removeProduct', cartItem)" class="del-btn"  alt="action">
                  </div>
    `
};