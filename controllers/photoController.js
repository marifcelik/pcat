const fs = require('fs');
const path = require('path');
const Photo = require('../models/Photo');

class photoController {
    async getAllPhotos(req, res) {
        const photos = await Photo.find({}).sort('-creationDate');
        res.render('index', { photos });
    }

    async addPhoto(req, res) {
        let img = req.files.image
        let imgpath = __dirname + '/../public/uploads/' + img.name

        if (fs.existsSync(imgpath))
            img.name = path.parse(img.name).name + '(1)' + path.parse(img.name).ext;

        await img.mv(imgpath, err => { if (err) throw err })

        await Photo.create({
            ...req.body,
            image: '/uploads/' + img.name
        });
        res.redirect('/');
    }

    async editPhoto(req, res) {
        let imageObj;
        let id = req.body.postid
        delete req.body.postid

        if (req.files?.inputImg) {
            let img = req.files.inputImg
            let imgpath = __dirname + '/../public/uploads/';

            if (fs.existsSync(imgpath + img.name))
                img.name = path.parse(img.name).name + '(1)' + path.parse(img.name).ext;

            imageObj = { image: '/uploads/' + img.name }
            await img.mv(imgpath + img.name, err => { if (err) throw err })
        } else
            imageObj = {}

        await Photo.findByIdAndUpdate(id, {
            ...req.body,
            ...imageObj
        })

        res.redirect(`/photo/${id}`)
    }

    async delPhoto(req, res) {
        await Photo.findByIdAndDelete(req.body.id)
        res.redirect('/');
    }
}

module.exports = new photoController();
