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
* s3_service - simulates an S3 cloud, using fake-s3

## Step by step guide

### Preparing the app hierarchy

Since the situation we're trying to simulate implies three entities (the local
station, the cloud and the mongo database), we're going to need three
containers. To make everything run automatically, we are going to use a
docker-compose file that starts all three containers.

For each container, we are going to use some specific scripts and dockerfiles,
so it's best to make separate directories: fetcher and s3_uploader (mongo needs
no scripts).

Preliminary docker-compose.yml:
```sh
mongo:
    image: mongo:3.2
    container_name: mongo
    command: mongod --smallfiles
    expose:
        - 27017

s3_service:
    build: ./s3_uploader
    expose:
        - 4567

fetcher:
    build: ./fetcher
    links:
        - mongo:mongo
        - s3_service:s3-service
```
1. mongo
- we specify the mongo image we're using (mongo:3.2 - will be pulled from the
official repository)
- we specify a container name (mongo)
- it's going to run the mongod daemon for a small database
- we know for sure we need to expose port 27017, so that other containers can
interact with mongo
2. s3_service
- s3_uploader directory represents the build context; before we run
docker-compose, we must add a Dockerfile into that directory
- we're going to add a command later
3. fetcher
- represents the local client
- we'll use fetcher directory as build context
- since the client fetches data from mongo and uploads it to s3, we need links
to the other containers


### Generating data for the database

We generate data on the "local station" (fetcher).
For this station, use the ubuntu:latest starting image. 
Since we're going to use some javascript scripts to interact with MongoDB, we
need to install npm and a js library to interact with MongoDB. Also, in order
to store data into S3, install aws-cli. The mongo-org 3.2 package will also be
needed later. See installed packages in fetcher/Dockerfile.

Now that the Dockerfile is ready, we can start writing scripts. 

Use fetcher/fill_database.js to generate some data and send it to the mongo
instance. This script generates some collections ('a', 'ab', 'abc', ... 'a-z')
that contain a list of values (non-random).
Run the program in a bash script (fetcher/archive_db), since more commands
follow.

### Backing up data

The simplest way to back up data is using mongodump:
```
mongodump --host mongo --port 27017 --db $1 --gzip --archive=$ARCHIVE
```
This command will back up all data from the mongo instance, from the requested
database ($1), generate json and bson files for the collections, then archive
the whole result into $ARCHIVE.

