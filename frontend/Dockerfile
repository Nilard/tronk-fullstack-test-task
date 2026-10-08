FROM node:lts-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run generate

FROM nginx:stable-alpine

COPY --from=build /app/.output/public /usr/share/nginx/html
