# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production
# RUN npm i

# Copy app source
COPY src/ ./src/

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]