const sass = require('node-sass');
const fs = require('fs');

sass.render({
    file: './style.scss',
    outFile: './style.css'
},  (err, res) => {
    if(err) {
        console.error(err);
    }
    fs.writeFile('./style.css', res.css, { encoding: 'utf8'}, err => {
        if(err) {
            console.error(err);
        }
    })
})