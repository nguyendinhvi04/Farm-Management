FROM node:20-alpine
# Cache bust: 2026-03-03

WORKDIR /app

# Copy package files
COPY agri-backend/farm-backend/package*.json ./

# Install dependencies (production only)
RUN npm install --production --include=optional

# Copy backend source code
COPY agri-backend/farm-backend/ ./

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]
