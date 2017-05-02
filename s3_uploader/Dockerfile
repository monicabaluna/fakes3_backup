FROM debian:jessie

RUN apt-get update && apt-get install -yqq ruby rubygems-integration
RUN gem install fakes3

RUN mkdir -p /mnt/data/fake-s3
