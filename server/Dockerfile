# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY . .

# Expose port (Fly.io usually uses 8080 or sets via ENV, but we expose 3000 as default)
EXPOSE 3000

# Start command
CMD ["node", "server.js"]
