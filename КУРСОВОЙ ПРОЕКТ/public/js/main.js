
import {Content} from "./ContentComponent.js";
import {Sections} from "./SectionsComponent.js";
import {Services} from "./ServicesComponent.js";
import {Subscribe} from "./SubscribeComponent.js";
import {Foot} from "./FootComponent.js";
import {Error} from "./Error.js";
import {Cart} from "./Cart.js";
import {Browsedrop} from "./BrowseDropdownComponent.js";
import {Products} from "./Products.js";
import {Servicesh} from "./ServicesHorizontslComponent.js";
import {Breadcramps} from "./BreadcrampsComponent.js";
import {Singleproduct} from "./SingleProduct.js";



const App = {
    components: {
        Servicesh,
        Content,
        Sections,
        Services,
        Subscribe,
        Foot,
        Error,
        Cart,
        Browsedrop,
        Products,
        Breadcramps,
        Singleproduct,



    },
    data() {
        return{
            visibility:true,
            cartItems: [],
        }
    },
    provide() {
        return {
            getJson: this.getJson,
            putJson: this.putJson,
            postJson: this.postJson,
            deleteJson: this.deleteJson,
            addGoldenClass: this.addGoldenClass,
            removeGoldenClass: this.removeGoldenClass
        }
    },
    methods: {

        addMegaDropdown($event){
            $event.target.insertAdjacentHTML('beforeend',`
            <div class="bottomline__dropdown" v-show="!visibility" id="myDropdownMega">
               <div class="dropdown__row">
                  <div class="row__column">
                     <div class="dropdown__group mega__group">
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
                  </div>
                  <div class="row__column">
                     <div class="dropdown__group mega__group">
                        <div class="group__name">Women</div>
                        <ul class="group__list">
                           <li><a href="">Dresses</a></li>
                           <li><a href="">Tops</a></li>
                           <li><a href="">Sweaters/Knits</a></li>
                           <li><a href="">Sweaters/Knits</a></li>

                        </ul>
                     </div>
                     <div class="dropdown__group mega__group">
                        <div class="group__name">Women</div>
                        <ul class="group__list">
                           <li><a href="">Dresses</a></li>
                           <li><a href="">Tops</a></li>
                           <li><a href="">Sweaters/Knits</a></li>

                        </ul>
                     </div>
                  </div>
                  <div class="row__column">
                     <div class="dropdown__group mega__group">
                        <div class="group__name">Women</div>
                        <ul class="group__list">
                           <li><a href="">Dresses</a></li>
                           <li><a href="">Tops</a></li>
                           <li><a href="">Sweaters/Knits</a></li>
                           <li><a href="">Sweaters/Knits</a></li>

                        </ul>
                     </div>
                     <div class="offer"></div>
                  </div>
               </div>
            </div>`)
        },
        deleteMegaDropdown($event){
            let drop = $event.target.querySelector('.bottomline__dropdown')
            drop.remove()
        },
        openBurger() {
            document.getElementById("burgerControl").classList.toggle("burger-open");
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setCurrentError(error));
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setCurrentError(error));
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setCurrentError(error));
        },
        deleteJson(url){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setCurrentError(error));
        },
    }

};

Vue.createApp(App).mount('#app');





