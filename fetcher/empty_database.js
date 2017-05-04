#!/usr/bin/env nodejs

var url = 'mongodb://mongo:27017/';

if (process.argv.length < 3)
    url += 'test';
else
    url += process.argv[2];

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

MongoClient.connect(url,
                    function(err, db) {
                        assert.equal(null, err);
                        db.dropDatabase(function(err, result) {
                                            assert.equal(null, err);
                                            db.close();
                                        }
                        );
                    }
);
