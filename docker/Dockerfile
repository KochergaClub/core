FROM python:3.7.2

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN (curl -sL https://deb.nodesource.com/setup_10.x | bash -) && apt-get install -y nodejs

ARG NPM_TOKEN
RUN npm config set registry https://npm.team.kocherga.club/ \
    && echo "//npm.team.kocherga.club/:_authToken=\"$NPM_TOKEN\"" >>/root/.npmrc

RUN pip install --upgrade pip && pip install pip-tools

WORKDIR /code
COPY requirements.txt /code/
RUN pip-sync

RUN apt-get install -y inotify-tools

COPY package.json package-lock.json /code/
RUN npm ci

COPY . /code/

RUN NODE_ENV=production npx webpack --config ./webpack/front.config.js && \
    NODE_ENV=production npx webpack --config ./webpack/back.config.js
