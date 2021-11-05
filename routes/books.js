const express = require('express');
const router = express.Router();

const Book = require('../models/book');


//get routes starts here
router.get('/', (req, res) => {
    Book.find({})
        .then(books => {
            res.render('index', { books: books });
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        })

});

router.get('/book/new', (req, res) => {
    res.render('new');
});

router.get('/book/search', (req, res) => {
    res.render('search', { book: "" });
});

router.get('/book', (req, res) => {
    let searchQuery = { name: req.query.name };

    Book.findOne(searchQuery)
        .then(book => {
            res.render('search', { book: book });
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        });

});

router.get('/edit/:id', (req, res) => {

    let searchQuery = { _id: req.params.id };
    Book.findOne(searchQuery)
        .then(book => {
            res.render('edit', { book: book });
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/book/new', (req, res) => {
    let newbook = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };

    Book.create(newBook)
        .then(book => {
            req.flash('success_msg', 'Book data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res) => {
    let searchQuery = { _id: req.params.id };

    Book.updateOne(searchQuery, {
            $set: {
                name: req.body.name,
                designation: req.body.designation,
                salary: req.body.salary
            }
        })
        .then(book => {
            req.flash('success_msg', 'Book data updated successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res) => {
    let searchQuery = { _id: req.params.id };

    Book.deleteOne(searchQuery)
        .then(book => {
            req.flash('success_msg', 'Book deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;