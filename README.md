# fakes3_backup

Hootsuite DevOps Challenge

## Running the app

Fakes3_backup is a MongoDB database backup system, using fakes3 to simulate
cloud storage. 
To just run the app, just type:
```sh
$ ./run.sh
```
You will see three containers running at the same time:
* mongo - the MongoDB instance
* fetcher - the "local" app - fetches data from the database and then checks if
  it's correctly backed up with S3
* s3_service - simulates a S3 cloud, using fake-s3

## Step by step guide

