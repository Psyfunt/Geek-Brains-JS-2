
const App = {
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            catalogUrl: '/catalogData.json',
            products: [],
            cartItems: [],
            filtered:  [],
            catalogImg: 'https://placehold.it/150x150',
            cartImg: 'https://placehold.it/50x50',
            searchLine: '',
            isVisibleCart: false,
        }
    },
    methods: {
        request(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e));
        },
        filterGoods(){
                let regexp = new RegExp(this.searchLine, 'i');
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        addProduct(product) {
            this.request(`${this.API}/addToBasket.json`)
             .then(data => {
                 if (data.result) {
                     let find = this.cartItems.find(el => el.id_product === product.id_product);
                     if (find) {
                         find.quantity++;
                         return;
                     }
                     let prod = Object.assign({ quantity: 1 }, product);
                     this.cartItems.push(prod);
                 } else {
                     throw new Error('ERROR');
                 }
             })
        },
        removeProduct(product){
            this.request(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                            return;
                        }
                        this.cartItems.splice(this.products.indexOf(product), 1);
                    } else {
                        throw new Error('ERROR');
                    }
                })
        }
    },
    mounted() {
        this.request(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
};

Vue.createApp(App).mount('#app');



// const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
//
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 resolve(xhr.responseText)
//             }
//             if (xhr.status !== 200) {
//                 reject('error');
//             }
//         }
//         xhr.send();
//     })
// };
// getRequest(`${API}/getBasket.json`).then(data => console.dir(data));

// class BaseItem {
//     product_name = '';
//     price = 0;
//     id_product = 0;
//     img = '';
//     rendered = false;
//
//     constructor(product, img = 'https://placehold.it/200x150') {
//         ({ product_name: this.product_name, price: this.price, id_product: this.id_product } = product);
//         this.img = img;
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="product" data-id="${this.id_product}">
//                  <img src="${this.img}" alt="${this.product_name}">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price}</p>
//                      <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//              </div>`
//     }
// }
// class ProductItem extends BaseItem{}
//
// class CartItem extends BaseItem{
//     amount = 0;
//     constructor(el, img=`https://placehold.it/50x50`){
//         super(el, img);
//         this.amount = el.amount;
//     }
//     changeQuantity(count) {
//         this.amount += count;
//         this._updateItem();
//     }
//
//     removeMarkup() {
//         document.querySelector(`.cart__product[data-id="${this.id_product}"]`).remove();
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="cart__product" data-id="${this.id_product}">
//                     <div class="product__info">
//                         <img src="${this.img}" alt="image">
//                         <div class="product__description">
//                             <div class="product__title">${this.product_name}</div>
//                             <div class="product__amount">Amount: ${this.amount}</div>
//                             <div class="product__price">${this.price} 1 шт.</div>
//                         </div>
//                     </div>
//                      <div class="one-product__price">${this.amount*this.price}</div>
//                      <img src="img/action_icon.png" data-id="${this.id_product}" class="del-btn"  alt="action">
//                 </div>`
//     }
//
//     _updateItem() {
//         const block = document.querySelector(`.cart__product[data-id="${this.id_product}"]`);
//         block.querySelector(`.product__amount`).textContent = `Amount: ${this.amount}`;
//         block.querySelector(`.one-product__price`).textContent = `$${this.amount*this.price}`;
//     }
// }
//
// class BaseList {
//     static itemClasses = {
//         Products: ProductItem,
//         Basket: CartItem
//     };
//     static API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
//
//     products = [];
//     container = null;
//     pass = '';
//
//     constructor(pass, container){
//         this.container = document.querySelector(container);
//         this.pass = pass;
//         this._init();
//     }
//
//     getRequest(pass){
//         return fetch(pass ? pass : `${BaseList.API + this.pass}`)
//             .then(result => result.json())
//
//     }
//
//     useData(data) {
//         for (let item of data) {
//             this.products.push(new BaseList.itemClasses[this.constructor.name](item));
//         }
//         this._render();
//     }
//
//     getItem(id){
//         return this.products.find(el => el.id_product === id);
//     }
//
//     _init(){
//     }
//
//     _render() {
//         for (let product of this.products) {
//             if (product.rendered) {
//                 continue;
//             }
//             this.container.insertAdjacentHTML('beforeend', product.render())
//         }
//     }
// }
//
// class Products extends BaseList {
//     cart = null;
//     filtered = [];
//     constructor(cart, pass="/catalogData.json", container=`.products`){
//         super(pass, container);
//         this.cart = cart;
//         this.getRequest()
//             .then(data => this.useData(data))
//     }
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.products.filter(el => regexp.test(el.product_name));
//         this.products.forEach(el => {
//             const block = document.querySelector(`.product[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('none');
//             } else {
//                 block.classList.remove('none');
//             }
//         })
//     }
//     _init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.cart.addProduct(this.getItem(id))
//             }
//         });
//         document.querySelector(`.search-form`).addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         });
//     }
// }
//
// class Basket extends BaseList {
//     constructor(pass='/getBasket.json', container='.cart-body'){
//         super(pass, container);
//     }
//
//     addProduct(product) {
//         this.getRequest(`${BaseList.API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let find = this.products.find(el => el.id_product === product.id_product);
//                     if (find) {
//                         find.changeQuantity(1);
//                         return;
//                     }
//
//                     let prod = Object.assign({ amount: 1 }, product);
//                     this.useData([prod]);
//                 } else {
//                     console.log('some error');
//                 }
//             })
//     }
//     removeProduct(product) {
//         this.getRequest(`${BaseList.API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     if (product.amount > 1) {
//                         product.changeQuantity(-1);
//                         return;
//                     }
//
//                     this.products.splice(this.products.indexOf(product), 1);
//                     product.removeMarkup();
//                 } else {
//                     console.log('some error');
//                 }
//             })
//     }
//
//     _init(){
//         this.container.addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 const id = +e.target.dataset['id'];
//                 this.removeProduct(this.getItem(id));
//             }
//         });
//         document.querySelector(`.btn-cart`).addEventListener('click', () => {
//             this.container.classList.toggle(`none`);
//         })
//     }
//
// }
//
// const cart = new Basket();
// const products = new Products(cart);



