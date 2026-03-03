FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY agri-backend/farm-backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source code
COPY agri-backend/farm-backend/ ./

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]
