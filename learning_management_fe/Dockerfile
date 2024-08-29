ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install pinia --legacy-peer-deps

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]