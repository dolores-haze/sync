FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build
