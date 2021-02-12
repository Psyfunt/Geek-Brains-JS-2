// Задание №3 (Запятые)
//Поскольку innerHTML является строковым свойством ,
// а map возвращает Array, его необходимо преобразовать в строку (неявно вызывая его метод toString ).
// Метод toString массива выведет значения массива, разделенные запятой , генерируя неожиданный вывод.
//
//Избавился от этой проблемы используя метод insertAdjacentHTML

const products = [
   { id: 1, title: 'Notebook', price: 2000, photo: '' },
   { id: 2, title: 'Keyboard', price: 200, photo: '' },
   { id: 3, title: 'Mouse', price: 47, photo: '' },
   { id: 4, title: 'Gamepad', price: 87, photo: '' },
];
const divProducts = document.querySelector('.products');

const renderProduct = (title = "Название продукта", price = 'Цена продукта', photo = 'images/1.jpg') => {
   return `<div class="product">
            <h3>${title}</h3>
            <img src="${photo}" alt="${title}">
            <p>${price}</p>
            <button class=" btn buy-btn">В корзину</button>
          </div> `
}
const renderAllProducts = (products) => {
   products.map(el => divProducts.insertAdjacentHTML('afterbegin', renderProduct(el.title, el.price)))
}
renderAllProducts(products);




// ТУТ Я ПРАКТИКОВАЛСЯ С ООП НЕМНОГО)

// const productsPage = {
//    divProducts: document.querySelector('.products'),
//    products: [
//       { id: 1, title: 'Notebook', price: 2000, photo: '' },
//       { id: 2, title: 'Keyboard', price: 200, photo: '' },
//       { id: 3, title: 'Mouse', price: 47, photo: '' },
//       { id: 4, title: 'Gamepad', price: 87, photo: '' },
//
//    ],
//    renderProduct(title = "Название продукта", price = 'Цена продукта', photo = 'images/1.jpg') {
//       return `<div class="product">
//                <h3>${title}</h3>
//                <img src="${photo}" alt="${title}">
//                <p>${price}</p>
//                <button class="buy-btn">В корзину</button>
//              </div> `
//    },
//    renderAllProducts() {
//       this.products.map(el => this.divProducts.insertAdjacentHTML('afterbegin', this.renderProduct(el.title, el.price)))
//    }
// }
// productsPage.renderAllProducts();


