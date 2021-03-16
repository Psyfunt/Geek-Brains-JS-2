
export const ProductItem = {
    props: ['img', 'product'],

    template: ` 
                <figure class="list__item">
                <a href="../singlePage.html"></a>
                <img class="card__image" :src="img" :alt="product.product_name">
                     <div class="hover__btn">
                        <span  class="buy-btn buy" @click="$root.$refs.cart.addProduct(product)" >Add to cart</span>
                     </div>
                     <div class="stars main__stars" @mouseover.stop="$root.$refs.products.addGoldenClass($event.currentTarget)" 
                                        @mouseout="$root.$refs.products.removeGoldenClass($event.currentTarget)"  >
                            <i  class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                            <i   class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                            <i  class="i fas fa-star"></i>
                        </div>
                    <figcaption class="card__description">
                        <span class="card__description-item ">{{ product.product_name }}</span>
                        <span class="card__description-item">$ {{ product.price }} </span>
                        
                    </figcaption>
                </figure>
                `
}