FROM node:20  # Ganti dengan versi terbaru yang stabil

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
