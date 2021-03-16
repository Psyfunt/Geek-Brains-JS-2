export const Singleproduct = {
    props: ['img', 'product'],
    template: `
            <section class="slider">
                <div class="slider__box">
                <div class="box__controls">
                     <span><i class="fas fa-chevron-left"></i></span>
                    </div>
                <div class="box__image">
                 <picture><source srcset="./img/Images/single_page_img.jpg" type="image/webp"><img src="./img/Images/single_page_img.jpg" alt="photo"></picture>
                 </div>
                <div class="box__controls">
                    <span><i class="fas fa-chevron-right"></i></span>
                        </div>
                     </div>
                    </section>

                <section class="product container">
   <div class="product__info">
      <div class="info__collection">
         <h4>women collection</h4>

      </div>
      <div class="info__name">
         Moschino Cheap And Chic
      </div>
      <div class="info__about">
         <p>Compellingly actualize fully researched processes before proactive outsourcing. Progressively
            syndicate collaborative architectures before cutting-edge services. Completely visualize
            parallel
            core competencies rather than exceptional portals. </p>
      </div>
      <div class="info__ditails">
         <span>material:<span>cotton</span></span>
         <span>designer:<span>binburhan</span></span>
      </div>
      <div class="info__price">$561</div>
   </div>
   <form action="#" class="cart-form">
      <label class="cart-form__label" for="color">
         Choose color
         <select class="cart-form__field" name="color" id="color">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
         </select>
      </label>
      <label class="cart-form__label" for="size">
         Choose size
         <select class="cart-form__field" name="size" id="size">
            <option value="XXL">XXL</option>
            <option value="XL">XL</option>
            <option value="L">L</option>
         </select>
      </label>
      <label class="cart-form__label">
         Quantity
         <input class="cart-form__field" type="number" placeholder="2">
      </label>
      <button class="cart-form__submit flip-horizontal-bottom">Add to Cart</button>
   </form>
</section>

    `
};