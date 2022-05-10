const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');
// const ejs = require('ejs');
const app = express();
const port = 3000;

const logger = (res, req, next) => {
    console.log('log deneme');
    next();
}

let sayfalar = [
    { adres: '', content: 'index' },
    { adres: 'index', content: 'index' },
    { adres: 'about', content: 'about' },
    { adres: 'contact', content: 'contact' }
]

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(logger);


app.get('/', (req, res) => {
    res.render('index');
    console.log(req.url);
    console.log(req.params);
})

app.get('/:adres', (req, res) => {
    const sendFile = sayfalar.find(sayfa => sayfa.adres == req.params.adres)
    console.log(req.params);
    console.log(sendFile);
    res.render(sendFile.content);
    console.log(req.ip);
})

app.listen(port, () => {
    console.log('bağlandı');
})