FROM node:18

WORKDIR /app

# Copy only package files and install clean dependencies
COPY package*.json ./

# Install dependencies inside Docker (this avoids native mismatch errors)
RUN npm install sqlite3 express

# Copy the rest of the app
COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
