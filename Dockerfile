# Gunakan image Node.js versi terbaru
FROM node:23

# Set direktori kerja
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file ke dalam kontainer
COPY . .

# Expose port 5000
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "server.js"]
