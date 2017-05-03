FROM debian:jessie

RUN apt-get update && apt-get install -yqq ruby rubygems-integration
RUN gem install fakes3

RUN mkdir -p /mnt/data/fake-s3

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org

RUN apt-get -y install npm
RUN npm install --save knox

RUN apt-get -y install lsof
