FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install express sqlite3

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
