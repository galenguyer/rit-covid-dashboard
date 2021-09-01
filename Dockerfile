FROM node:12.17 as build-deps
RUN npm i -g pnpm
WORKDIR /usr/src/app
COPY package.json ./
RUN pnpm i
COPY . ./
RUN pnpm build

FROM cr.galenguyer.com/nginx/spa:latest
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html/
