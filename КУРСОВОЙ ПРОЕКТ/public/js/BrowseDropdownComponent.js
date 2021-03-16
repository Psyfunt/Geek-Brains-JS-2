export const Browsedrop = {

    data() {
        return {
            visibility: false,
        }
    },
    template:` <div>
                  <button @click="visibility = !visibility" class="dropbtn">Browse</button>
                  <div v-show="visibility" class="browse__dropdown">
                     <div class="dropdown__group">
                        <div class="group__name">Women</div>
                        <ul class="group__list">
                           <li><a href="">Dresses</a></li>
                           <li><a href="">Tops</a></li>
                           <li><a href="">Sweaters/Knits</a></li>
                           <li><a href="">Jackets/Coats</a></li>
                           <li><a href="">Blazers</a></li>
                           <li><a href="">Denim</a></li>
                           <li><a href="">Leggings/Pants</a></li>
                           <li><a href="">Skirts/Shorts</a></li>
                           <li><a href="">Accessories</a></li>
                        </ul>
                     </div>
                     <div class="dropdown__group">
                        <div class="group__name">Man</div>
                        <ul class="group__list">
                           <li><a href="">Tees/Tank tops</a></li>
                           <li><a href="">Shirts/Polos</a></li>
                           <li><a href="">Sweaters</a></li>
                           <li><a href="">Sweatshirts/Hoodies</a></li>
                           <li><a href="">Blazers</a></li>
                           <li><a href="">Jackets/vests</a></li>
                        </ul>
                     </div>
                  </div>
                  </div>
    `
}