FROM       ubuntu:latest

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

RUN apt-get update && apt-get install -y mongodb-org
RUN apt-get -y install npm
RUN npm install --save knox

RUN apt-get install -y python-pip
RUN pip install --upgrade pip
RUN pip install --upgrade awscli

RUN npm install --save mongodb
