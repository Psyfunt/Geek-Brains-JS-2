const cart = require('./cart');
const fs = require('fs');
const saveLog = require('./saveLog');


const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err){
            res.send({result: 0, text: 'Fail!'})
        } else {
            let {newCart, name} = cart[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if(err){
                    res.send({result: 0, text: 'Fail!'})
                } else {
                    saveLog(name, action);
                    res.send({result: 1, text: 'Victory!'})
                }
            })
        }
    })
};

module.exports = handler;