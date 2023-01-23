const express = require('express');
const { ObjectId } = require('mongodb');
const {connectToDb, getDb} = require('./db');

const app = express();
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('App listening on port 3000');
        });
        db = getDb();
    }
    else console.log('FIX')
})


app.get('/movies', (req, res) => {
    let movies = [];
    db.collection('movies')
        .find()
        .sort({director: 1})
        .forEach(movie => movies.push(movie))
        .then(() => {
            res.status(200).json(movies);
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'});
        })
})  

app.get('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('movies')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc);
            }) 
            .catch(err => {
                res.status(500).json({error: 'Could not fetch the document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid document id'})
    }
})