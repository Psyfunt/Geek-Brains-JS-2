const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText)
            }
            if (xhr.status !== 200) {
                reject('error');
            }
        }
        xhr.send();
    })
};
getRequest(`${API}/getBasket.json`).then(data => console.dir(data));

class BaseItem {
    constructor(el, img='https://placehold.it/200x150'){
        this.product_name = el.product_name;
        this.id_product = el.id_product;
        this.price = el.price;
        this.img = img;
    }
    render() {
        return `<div class="product" data-id="${this.id_product}">
                 <img src="${this.img}" alt="${this.product_name}">                
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id="${this.id_product}">Купить</button>               
             </div>`
    }
}
class ProductItem extends BaseItem{}

class CartItem extends BaseItem{
    constructor(el, img=`https://placehold.it/50x50`){
        super(el, img);
        this.amount = el.amount;
    }
    render() {
        return `<div class="cart__product" data-id="${this.id_product}">
                    <div class="product__info">
                        <img src="${this.img}" alt="image">
                        <div class="product__description">
                            <div class="product__title">${this.product_name}</div>
                            <div class="product__amount">Amount: ${this.amount}</div>
                            <div class="product__price">${this.price} 1 шт.</div>
                        </div>
                    </div>                    
                     <div class="one-product__price">${this.amount*this.price}</div>
                     <img src="img/action_icon.png" data-id="${this.id_product}" class="del-btn"  alt="action">                                            
                </div>`
    }
}

class BaseList {
    constructor(pass, container){
        this.container = container;
        this.pass = pass;
        this.data = [];
        this.allProducts = [];
        this._init();
    }

    getRequest(pass){
        return fetch(pass ? pass : `${API + this.pass}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    useData(data){
        this.data = [...data];
        this._render()
    }
    getItem(id){
        return this.allProducts.find(element => element.id_product === id);
    }

    _render(){
        const itemClasses = {
            Basket: CartItem,
            Products: ProductItem
        };
        const body = document.querySelector(this.container);
        for (let element of this.data) {
            const product = new itemClasses[this.constructor.name](element);
            this.allProducts.push(product);
            body.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

class Products extends BaseList {
    constructor(cart, pass="/catalogData.json", container=`.products`){
        super(pass, container);
        this.getRequest()
            .then(data => this.useData(data))
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                const id = Number(e.target.dataset['id']);
                cart.addProduct(this.getItem(id));
            }
        });
    }
}

class Basket extends BaseList {
    constructor(pass='/getBasket.json', container='.cart-body'){
        super(pass, container);
    }

    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')){
                const id = Number(e.target.dataset['id']);
                this.removeProduct(this.getItem(id));
            }
        });
        document.querySelector(`.btn-cart`).addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle(`none`);
        })
    }

    addProduct(product){
        this.getRequest(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let search = this.allProducts.find(el => el.id_product === product.id_product);
                    if(search){
                        search.amount++;
                        this._updateCart(search);
                    } else {
                        let element = Object.assign({amount: 1}, product);
                        this.data = [element];
                        this._render()
                    }
                } else {
                    throw new Error('Ошибка');
                }
            })
    }

    removeProduct(product){
        this.getRequest(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    if(product.amount > 1) {
                        product.amount--;
                        this._updateCart(product);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(product), 1);
                        document.querySelector(`.cart__product[data-id="${product.id_product}"]`).remove();
                    }
                } else {
                    throw new Error('Ошибка');
                }
            })
    }

    _updateCart(product){
        const body = document.querySelector(`.cart__product[data-id="${product.id_product}"]`);
        body.querySelector(`.product__amount`).textContent = `Amount: ${product.amount}`;
        body.querySelector(`.product__price`).textContent = `Total: ${product.amount*product.price}`;
    }
}

const cart = new Basket();
const products = new Products();



