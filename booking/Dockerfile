FROM node:13.8 AS builder

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm ci

COPY . /code
RUN npm run build

FROM nginx

COPY --from=builder /code/build /usr/share/nginx/html
