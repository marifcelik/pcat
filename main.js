const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const fileupload = require('express-fileupload');
const methodoverride = require('method-override');
const app = express();

const Photo = require('./models/Photo');

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

app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-creationDate');
    res.render('index', { photos });
})

app.get('/:adres', (req, res) => {
    const adres = req.params.adres;
    if (adres == 'index' || adres == 'photo' || adres == 'edit')
        res.redirect('/');
    res.render(req.params.adres);
})

app.post('/add', async (req, res) => {
    let img = req.files.image
    if (fs.existsSync(img.name))
        img.name = path.parse(img.name).name + '(1)' + path.parse(img.name).ext;
    let imgpath = __dirname + '/public/uploads/' + img.name

    console.log(req.body);
    console.log(img);

    await img.mv(imgpath, err => { if (err) throw err })
    await Photo.create({
        ...req.body,
        image: '/uploads/' + img.name
    });
    res.redirect('/');
})

app.get('/photo/:id', async (req, res) => {
    let data = await Photo.findById(req.params.id);
    res.render('photo', { data });
})

app.get('/edit/:id', async (req, res) => {
    let data = await Photo.findById(req.params.id)
    res.render('edit', { data });
})

app.put('/edit', async (req, res) => {
    let imageObj;
    let id = req.body.postid
    delete req.body.postid

    if (req.files?.inputImg) {
        let img = req.files.inputImg
        if (fs.existsSync(img.name))
            img.name = path.parse(img.name).name + '(1)' + path.parse(img.name).ext;
        let imgpath = __dirname + '/public/uploads/' + img.name
        imageObj = { image: '/uploads/' + img.name }
        await img.mv(imgpath, err => { if (err) throw err })
    } else 
        imageObj = {}

    await Photo.findByIdAndUpdate(id, {
        ...req.body,
        ...imageObj
    }, { new: true })

    res.redirect(`/photo/${id}`)
})

app.listen(port, host, () => console.log(`${host}:${port} dinleniyor`));
