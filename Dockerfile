# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port (match your app’s port)
EXPOSE 5000

# Set environment variable for production (optional)
ENV NODE_ENV=production

# Start the app
CMD ["node", "src/server.js"]
