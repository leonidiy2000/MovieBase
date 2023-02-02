const {MongoClient} = require('mongodb');

let dbConnection;
let uri = 'mongodb://0.0.0.0:27017/movieBase';
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log('ERROR connecting ', err);
                return cb(err);
            })
    },
    getDb: () => dbConnection
}