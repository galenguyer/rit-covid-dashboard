FROM node:12.17 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM cr.galenguyer.com/nginx/spa:latest
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html/
