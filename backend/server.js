require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const {connectToDb, getDb} = require('./db');
const movieRoutes = require('./routes/movies');
const mongoose = require('mongoose');

const app = express();
// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});
app.use('/api/movies', movieRoutes);

//connect to DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to DB && App listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// let db;
// connectToDb((err) => {
//     if (!err) {
//         app.listen(process.env.PORT, () => {
//             console.log('App listening on port 4000');
//         });
//         db = getDb();
//     }
//     else console.log('FIX')
// })