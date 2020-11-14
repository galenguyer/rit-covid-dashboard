FROM node:12.16.2 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM docker.galenguyer.com/nginx-auto/nginx-react
COPY --from=build-deps /usr/src/app/build /var/www/html/
CMD ["nginx", "-g", "daemon off;"]
