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

### Preparing app hierarchy

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
*mongo
** we specify the mongo image we're using (mongo:3.2 - will be pulled from the
official repository)
** we specify a container name (mongo)
** it's going to run the mongod daemon for a small database
** we know for sure we need to expose port 27017, so that other containers can
interact with mongo
*s3_service
** s3_uploader directory represents the build context; before we run
docker-compose, we must add a Dockerfile into that directory
** we're going to add a command later
*fetcher
** represents the local client
** we'll use fetcher directory as build context
** since the client fetches data from mongo and uploads it to s3, we need links
to the other containers
