const express = require('express');
const path = require('path');
// const ejs = require('ejs');
const app = express();
const port = 3000;

const logger = (res, req, next) => {
    console.log('log deneme');
    next();
}

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(logger);


app.get('/', (req, res) => {
    res.render('index');
    console.log(req.url);
    console.log(req.params);
})

app.get('/:adres', (req, res) => {
    console.log(req.params);
    console.log(req.ip);
    res.render(req.params.adres);
})

app.listen(port, () => {
    console.log('bağlandı');
})