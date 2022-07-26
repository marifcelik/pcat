const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const fileupload = require('express-fileupload');
const methodoverride = require('method-override');
const app = express();

const photoControl = require('./controllers/photoController');
const pageControl = require('./controllers/pageController');

const port = process.argv[2] || 3000;
const host = 'localhost';

app.use(methodoverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

(function baslangic() {
    if (!fs.existsSync('public/uploads'))
        fs.mkdirSync('public/uploads');

    mongoose.connect('mongodb://127.0.0.1:27017/pcat-db', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) throw err;
        console.log('veritabanına bağlantı başarılı');
    });
})();

app.get('/', photoControl.getAllPhotos)

app.get('/:adres', pageControl.servePage)

app.post('/add', photoControl.addPhoto)

app.get('/photo/:id', pageControl.photoPage)

app.get('/edit/:id', pageControl.editPage)

app.put('/edit', photoControl.editPhoto)

app.delete('/edit', photoControl.delPhoto)

app.listen(port, host, () => console.log(`${host}:${port} dinleniyor`));
