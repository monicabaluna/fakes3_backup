#!/bin/bash

rm -rf /mnt/data/fake-s3/s3-service/mongo_backup/dump

nohup fakes3 -r /mnt/data/fake-s3 -p 4567 &


while [ ! -e /mnt/data/fake-s3/s3-service/mongo_backup/dump ]; do
    ls /mnt/data/fake-s3/s3-service/mongo_backup
    sleep 1
done

sleep 5

echo "Fetched data"
mongorestore --host mongo --port 27017 --archive --gzip /mnt/data/fake-s3/s3-service/mongo_backup/dump --db restored
echo "Restored data"

while true; do sleep 1; done