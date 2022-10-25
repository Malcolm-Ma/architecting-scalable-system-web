FROM node:16 AS build

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

WORKDIR /app

COPY . .

ARG GENERATE_SOURCEMAP=false

RUN npm install && npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=Builder /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]