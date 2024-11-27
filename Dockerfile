# Gunakan image Node.js
FROM node:14

# Set direktori kerja
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file ke dalam kontainer
COPY . .

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]
