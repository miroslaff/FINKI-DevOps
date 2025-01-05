# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy all frontend files into the container
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose port for the frontend
EXPOSE 8080

# Serve the frontend files
CMD ["http-server", "-p", "8080"]
