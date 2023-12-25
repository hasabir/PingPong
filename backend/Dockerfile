FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env .env

# EXPOSE 3000

CMD ["npm", "run", "db:restart"]
