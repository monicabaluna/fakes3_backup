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
    ports:
        - 4567
    volumes:
        - ./s3_uploader/:/opt/s3_uploader:Z
    command: /opt/s3_uploader/unpack.sh

fetcher:
    build: ./fetcher
    links:
        - mongo:mongo
        - s3_service:s3-service
    volumes:
        - ./fetcher:/opt/fetcher:Z
    command: /opt/fetcher/archive_db.sh $db_name
```
