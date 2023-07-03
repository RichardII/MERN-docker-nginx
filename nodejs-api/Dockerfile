FROM node:18.16.1

WORKDIR /nodejs-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
