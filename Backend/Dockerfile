# Node version select karein
FROM node:18-alpine

# Container ke andar kaam karne ki jagah
WORKDIR /app

# Dependencies copy aur install karein
COPY package*.json ./
RUN npm install

# Baaki saara code copy karein
COPY . .

# Backend port (tumhare app.js mein 5000 hai)
EXPOSE 5000

# App start karne ki command
CMD ["npm", "start"]