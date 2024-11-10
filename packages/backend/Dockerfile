# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
RUN npm install -g @nestjs/cli
RUN npm install

# Copy source code to container
COPY . .

# Clean npm cache (optional but recommended to reduce image size and ensure a clean install)
RUN npm cache clean --force

# Build the application
RUN npm run build

# Expose the backend port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]