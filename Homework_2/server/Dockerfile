# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json /app/
RUN npm install --only=production

# Copy the application code and static files
COPY ./app /app

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
