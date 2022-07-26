const Photo = require('../models/Photo');

class PageController {
    servePage(req, res) {
        const adres = req.params.adres;
        if (adres == 'index' || adres == 'photo' || adres == 'edit')
            res.redirect('/');
        res.render(req.params.adres);
    }

    async editPage(req, res) {
        let data = await Photo.findById(req.params.id)
        res.render('edit', { data });
    }

    async photoPage(req, res) {
        let data = await Photo.findById(req.params.id);
        res.render('photo', { data });
    }
}

module.exports = new PageController();