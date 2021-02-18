class Catalog {
   data = [];
   products = [];
   container = null;
   totalCatalogPrice = 0;

   constructor(selector) {
      this.container = document.querySelector(selector);
      this._fetchData();
      this._render();
      this._countProductsPrice();
   }

   _countProductsPrice(){
      this.products.forEach(x => this.totalCatalogPrice += x.price)
   }

   _fetchData() {
      this.data = [
         { title: 'Notebook', id: 1, price: 2000 },
         { title: 'Keyboard', id: 2, price: 200 },
         { title: 'Mouse', id: 3, price: 100 },
         { title: 'Gamepad', id: 4, price: 87 }
      ];
   }

   _render() {
      for (let data of this.data) {
         const product = new ProductItem(data);
         this.products.push(product);
         this.container.insertAdjacentHTML('afterbegin', product.catalogProductRender())
      }
   }
}
class Item {
    constructor(el) {
        this.title = el.title;
        this.id = el.id;
        this.price = el.price;
    }
}
class ProductItem extends Item{
   constructor(el, photo='https://placehold.it/150x150'){
       super(el)
       this.photo = photo;
   }
   catalogProductRender() {
            return `<div class="product">
               <h3>${this.title}</h3>
               <img src="${this.photo}" alt="${this.title}">
               <p>${this.price}</p>
               <button id="${this.id}" class="btn buy-btn">В корзину</button>
             </div> `
   }
}

class Cart  {
   cartProductTargets = null;
   cartData = [];
   cartProducts = [];
   container = null;

   constructor(selector, targets) {
      this.cartProductTargets = document.querySelectorAll(targets);
      this.container = document.querySelector(selector);
      this._addClickHandlers();
      this._getCartData();


   }
   _getCartData() {
      this.cartData = catalog.data;

   }
   _renderCart(){   // отрисовывает корзину
         for (let data of this.cartProducts) {
            const product = new CartProductItem(data);
            this.container.insertAdjacentHTML('afterbegin', product.renderCartProduct())
         }
      }

   _addClickHandlers(){
      this.cartProductTargets.forEach(el => el.addEventListener('click', this.addProduct.bind(this)))
   }

   addProduct(){
      this.cartProducts.push(this.cartData.find(x => x.id === Number(event.target.id)))
      this._renderCart();
      this._clearCartProducts();
   }

    _clearCartProducts(){
       this.cartProducts = [];
    }

    // _addClickHandlers(){} // навешивает обработчики событий на кнопки товаров каталога
    // _updateCartData(){} // Обновляет данные корзины
    // _getCartData(){} // возвращает данные корзины
    // _saveCartData(){} // сохраняет корзину
    // _clearCartData(){} // очищает корзину
    // addProduct(){} //  добавляет товар в корзину
    // removeProduct(){} // удаляет товар из корзины
    // _getProductById(){} // получает товар по ID
    // changeCount(){} // меняет колличество определенного товара
    // getAllCount(){} // возвращает колличество товаров в корзине
    // _getCartSum(){} // считает сумму карзины
    // sortingByPrice(){} // сортирует товары по цене

}
class CartProductItem extends Item {
      count = 0;
     constructor(el) {
        super(el)
     }
     renderCartProduct(){ // отрисовывает товар корзины
         return ` <tr>
                   <td>${this.title}</td>
                   <td>${this.id}</td>
                   <td>${this.price}</td> 
                   <td>${this.count}</td>
                 </tr>`
      }

}
const catalog = new Catalog(".products");
console.log(catalog)
const cart = new Cart('.cart','.buy-btn');
console.log(cart.cartProductTargets);

