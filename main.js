const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Photo = require('./models/Photo');

(function baglanti_deneme() {
    mongoose.connect('mongodb://127.0.0.1:27017/pcat-db', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) throw err;
        console.log('veritabanına bağlantı başarılı');
    });
})();

const port = process.argv[2] || 3000;
const host = 'localhost';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', { photos });
})

app.get('/:adres', (req, res) => {
    const adres = req.params.adres;
    if (adres == 'index' || adres == 'photo')
        res.redirect('/')
    res.render(req.params.adres);
})

app.post('/add', async (req, res) => {
    console.log(req.body);
    await Photo.create(req.body)
    res.redirect('/');
})

app.get('/photo/:id', async (req, res) => {
    let page = await Photo.findById(req.params.id)
    res.render('photo', { data: page })
})

app.listen(port, host, () => console.log(`${host}:${port} dinleniyor`))
