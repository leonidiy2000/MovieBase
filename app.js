const express = require('express');
const { ObjectId } = require('mongodb');
const {connectToDb, getDb} = require('./db');

const app = express();
app.use(express.json());
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
    const page = req.query.page || 0;
    const pageSize = 3;
    let movies = [];
    db.collection('movies')
        .find()
        .sort({director: 1})
        .skip(page * pageSize)
        .limit(pageSize)
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

app.post('/movies', (req, res) => {
    const movie = req.body;
    db.collection('movies')
        .insertOne(movie)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not create a new movie'});
        })
})

app.delete('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('movies')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result);
            }) 
            .catch(err => {
                res.status(500).json({error: 'Could not delete the document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid document id'})
    }
})

app.patch('/movies/:id', (req, res) => {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
        db.collection('movies')
            .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result);
            }) 
            .catch(err => {
                res.status(500).json({error: 'Could not update the document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid document id'})
    }
})