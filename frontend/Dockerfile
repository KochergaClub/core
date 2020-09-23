FROM node:14.5 as base

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN npm config set registry https://npm.team.kocherga.club/

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm ci

COPY . /code/

ARG SENTRY_RELEASE=""
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

CMD ["node", "./dist/index.js"]

FROM base as production

# RUN NODE_ENV=production npx next build
RUN NODE_ENV=production npx webpack --config webpack.server.js
