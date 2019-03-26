FROM python:3.7.2

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN (curl -sL https://deb.nodesource.com/setup_10.x | bash -) && apt install -y nodejs

# pyppeteer deps
# (unused - we use browserless/chrome for now)
#
# RUN apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
#     libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
#     libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
#     ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

ARG NPM_TOKEN
RUN npm config set registry https://npm.team.kocherga.club/ \
    && echo "//npm.team.kocherga.club/:_authToken=\"$NPM_TOKEN\"" >>/root/.npmrc

RUN pip install poetry

WORKDIR /code
COPY poetry.lock pyproject.toml /code/
RUN poetry install

RUN apt install -y inotify-tools

COPY package.json package-lock.json /code/
RUN npm ci

COPY . /code/

RUN npx webpack --config ./webpack/front.config.js -p && \
    npx webpack --config ./webpack/back.config.js -p
