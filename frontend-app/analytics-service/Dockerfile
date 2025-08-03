FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 6000

# Start the analytics service
CMD ["node", "server.js"]
