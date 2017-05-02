#!/bin/bash

ARCHIVE=/opt/fetcher/dump

rm $ARCHIVE
mongodump --host mongo --port 27017 --db $1 --gzip --archive=$ARCHIVE

export AWS_ACCESS_KEY_ID=1234
export AWS_SECRET_ACCESS_KEY=1234
export AWS_DEFAULT_REGION=us-west-2

aws --endpoint-url http://s3-service:4567 s3 mb s3://mongo_backup
aws --endpoint-url http://s3-service:4567 s3 cp $ARCHIVE s3://mongo_backup/dump