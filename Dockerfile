FROM node:16 as build-deps
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install --global pnpm && \
    pnpm install
COPY . ./
RUN pnpm run build

FROM cr.galenguyer.com/nginx:spa
COPY --from=build-deps /usr/src/app/dist usr/share/nginx/html/
