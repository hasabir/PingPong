FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps

COPY . .

EXPOSE 3005

CMD ["npm", "run", "start"]
