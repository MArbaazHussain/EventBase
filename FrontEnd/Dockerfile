FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite ki default port
EXPOSE 5173

# Vite ko external access ke liye --host flag chahiye hota hai
CMD ["npm", "run", "dev", "--", "--host"]