#!/usr/bin/env nodejs

var url = 'mongodb://mongo:27017/';

if (process.argv.length < 3)
    url += 'test'
else
    url += process.argv[2]

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(url,
                    function(err, db) {
                        assert.equal(null, err);
                        db.dropDatabase();
                        
                    }
);
