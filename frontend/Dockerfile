# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 1234

# Command to run your application
CMD ["npm", "start"]