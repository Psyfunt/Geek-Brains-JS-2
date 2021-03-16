const add = (cart, req) => {
    cart.contents.push(req.body);
    return {newCart: JSON.stringify(cart, null, 4), name: req.body.product_name};
};

const update = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    if (req.body.inp) {
        find.quantity = req.body.quantity;
    }else {
        find.quantity += req.body.quantity;
    }
    return { newCart: JSON.stringify(cart, null, 4), name: find.product_name };
};

const remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return {newCart: JSON.stringify(cart, null, 4), name: find.product_name};
};

const clear = (cart) => {
    cart.contents = [];
    return { newCart: JSON.stringify(cart, null, 4), name: 'Clear cart' };
};
module.exports = {
    add,
    update,
    remove,
    clear
};