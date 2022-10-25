FROM node:16 AS Builder

ENV NPM_CONFIG_LOGLEVEL info

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

ARG GENERATE_SOURCEMAP=false

RUN npm install && npm run build

FROM nginx:1.13.3-alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=Builder /usr/src/app/build /usr/share/nginx/html