const express = require('express');
const router = express.Router();
const Court = require('../models/court');

router.get('/', async (req, res) => {
    // show list of courts
    try {
        res.render('courts/index', {
            courts: await Court.find()
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    // show create new court form
    try {
        res.render('courts/new', {
            court: null
        });
    } catch (err) {
        console.error(err);
        res.redirect('/courts');
    }
});

router.post('/', async (req, res) => {
    // add new court to db
    try {
        const court = new Court({
            name: req.body.name,
            regularRate: req.body.regularRate,
            primeRate: req.body.primeRate,
            surface: req.body.surface || 'Hardtop'
        });
        await court.save();
        res.redirect('/courts');
    } catch (err) {
        console.error(err);
        res.render('courts/new', {
            errorMessage: 'Error creating new court',
            courts: await Court.find()
        });
    }
});

router.get('/:id/edit', async (req, res) => {
    // edit court page
    try {
        res.render('courts/edit', {
            court: await Court.findById(req.params.id)
        });
    } catch (err) {
        console.error(err);
        res.render('/courts', {
            errorMessage: 'Error displaying edit court page.'
        });
    }
});

router.put('/:id', async (req, res) => {
    // edit court record in database
    try {
        const court = await Court.findById(req.params.id);
        court.name = req.body.name;
        court.surface = req.body.surface;
        court.regularRate = req.body.regularRate;
        court.primeRate = req.body.primeRate;

        await court.save();
        res.redirect('/courts');
    } catch (err) {
        console.error(err);
        res.render(`courts/edit`, {
            errorMessage: 'Error editing court.',
            court: await Court.findById(req.params.id)
        });
    }
});

router.delete('/:id', async (req, res) => {
    // delete court
    try {
        await Court.findByIdAndDelete(req.params.id);
        res.redirect('/courts')
    } catch (err) {
        console.error(err);
        res.redirect('/courts');
    }
});

module.exports = router;