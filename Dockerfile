FROM kocherga/code/core/base

COPY . /code
WORKDIR /code
RUN poetry install


RUN npm config set registry https://npm.team.kocherga.club/
ARG NPM_TOKEN
RUN echo "//npm.team.kocherga.club/:_authToken=\"$NPM_TOKEN\"" >>/root/.npmrc

RUN npm ci
