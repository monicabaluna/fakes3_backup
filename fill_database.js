var url = 'mongodb://localhost:27017/';

if (process.argv.length < 3)
    url += 'test'
else
    url += process.argv[2]

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var value = 0
var generate_data = function() {
    var data = []
    for (i = 0; i < 100; i++) {
        data[i] = {}
        for (j = 0; j < 10; j++) {
            data[i][j] = value
            value += 1
        }
    }
    return data;
}

var nextChar = function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

var insertDocuments = function(db, callback) {
    var collectionName = ""
    for (letter = "a"; letter <= "z"; letter = nextChar(letter)) {
        collectionName += letter;
        data = generate_data()
        db.collection(collectionName).insertMany(data);
    }
    callback();
};

MongoClient.connect(url,
    function(err, db) {
        assert.equal(null, err);
        insertDocuments(db, function() {
            db.close();
        });
    }
);
