# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files (including HTML, assets, server.js)
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
