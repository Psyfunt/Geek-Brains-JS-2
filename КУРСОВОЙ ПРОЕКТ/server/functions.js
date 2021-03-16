function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min //Максимум и минимум включаются
}

function getRandomProducts(data, amount) {
    const products = JSON.parse(data);
    const newProducts = [];

    while (newProducts.length < amount) {
        const prod = products[getRandomNum(0, products.length - 1)];
        if (!newProducts.find(_prod => _prod.id_product === prod.id_product)) {
            newProducts.push(prod)
        }
    }
    return newProducts
}


module.exports = { getRandomProducts };