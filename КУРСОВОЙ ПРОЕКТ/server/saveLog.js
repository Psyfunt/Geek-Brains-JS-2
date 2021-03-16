const moment = require('moment');
const fs = require('fs');

const saveLog = (name, action) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if(err){
            console.log('УПС');
        } else {
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                act: action,
                name: name
            });
            fs.writeFile('server/db/stats.json', JSON.stringify(stat, null, 4), (err) => {
                if(err){
                    console.log('АЙ')
                }
            })
        }
    })
};

module.exports = saveLog;