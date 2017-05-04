#!/usr/bin/env nodejs
"use strict";

var url = 'mongodb://mongo:27017/';

if (process.argv.length < 3)
    url += 'test';
else
    url += process.argv[2];

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

var value = 0
function generate_data() {
    let data = [];
    for (let i = 0; i < 100; i++) {
        data[i] = {};
        for (let j = 0; j < 10; j++) {
            data[i][j] = value;
            value += 1;
        }
    }
    return data;
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function insertDocuments(db, callback) {
    let collectionName = ""
    for (let letter = "a"; letter <= "z"; letter = nextChar(letter)) {
        collectionName += letter;
        let data = generate_data();
        db.collection(collectionName).insertMany(data);
    }
    callback();
};

MongoClient.connect(url,
    function(err, db) {
        assert.equal(null, err);
        db.dropDatabase(function() {
            insertDocuments(db, function() {
            db.close();
            });
        });
        
    }
);
