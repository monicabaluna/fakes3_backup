#!/usr/bin/env nodejs

"use strict";

var url = 'mongodb://mongo:27017/';
console.log('Checking backed-up data...');

if (process.argv.length < 3)
    url += 'test';
else
    url += process.argv[2];

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

var value = 0;
function generate_data () {
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

function nextChar (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function dataMatches (db_data, my_data) {
    if(db_data.length < my_data.length)
        return false;

    for(let i = 0; i < my_data.length; i++) {
        for (let j = 0; j < 10; j ++)
            if(my_data[i][j] !== db_data[i][j])
                return false;
    }

    return true;
}

function checkDocuments (db, callback) {
    let collectionName = "";
    for (let letter = "a"; letter <= "z"; letter = nextChar(letter)) {
        collectionName += letter;
        let data = generate_data();
        db.collection(collectionName).find().toArray(function(err, db_data) {
            if (dataMatches(db_data, data))
                console.log('DATA IS IN S3');
            else
                console.log('DATA NOT IN S3');
        });

    }
    callback();
};

MongoClient.connect(url,
    function(err, db) {
        assert.equal(null, err);
        checkDocuments(db, function() {
            db.close();
        });
    }
);
