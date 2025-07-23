# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci --only=production && \
    cd frontend && npm ci --only=production && \
    cd ../server && npm ci --only=production

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose port
EXPOSE 5001

# Start the application
CMD ["npm", "start"] 