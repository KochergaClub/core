# syntax=docker/dockerfile:experimental
FROM node:14.16.1 as base

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN npm config set registry https://npm.team.kocherga.club/

WORKDIR /code

COPY package.json yarn.lock /code/
COPY patches /code/patches/
RUN yarn install --frozen-lockfile  && yarn cache clean

COPY . /code/

ARG SENTRY_RELEASE=""
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
ARG SENTRY_AUTH_TOKEN=""
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

CMD ["node", "./dist/index.js"]

FROM base as production

# see https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md for details
RUN --mount=id=webpack-cache,sharing=locked,type=cache,target=/code/.next/cache/webpack \
    NODE_ENV=production NODE_OPTIONS='--max_old_space_size=4096' npx next build && \
    NODE_ENV=production npx webpack --config webpack.server.js
