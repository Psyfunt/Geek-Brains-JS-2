const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const { getRandomProducts } = require('./functions');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cartRouter);

app.get('/api/products/:amount', (req, res) => {
    const amount = +req.params.amount;
    fs.readFile('server/db/products.json', 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        res.send(JSON.stringify(getRandomProducts(data, amount)));
    })
});

app.listen(3000, () => console.log('Server started....'));



