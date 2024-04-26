const { MongoClient } = require('mongodb');
const URL = 'mongodb+srv://kewapi:shark1234@cluster0.tamqgtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test';

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Connected to MongoDB');
            dbConnection = client.db();
            const db = mongoClient.db("test");
            const collection = db.collection("Orders");
            const user = {items: cart, address: deliveryAddress, time: deliveryTime, comment: orderComment };
            return cb();
        })
        .catch((err) => {
            return cb(err);
        })
    },
    getDb: () => dbConnection,
}