export const ProductItem = {
    props: ['img', 'product'],
    template: ` 
                <div class="product" >
                    <img :src="img" :alt="product.product_name">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div> `
};