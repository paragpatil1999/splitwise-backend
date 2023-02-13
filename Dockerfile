# Use an existing image as the base image
FROM node:18.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set the environment variables (if any)
ENV NODE_ENV production

# Expose the port on which your application is running
EXPOSE 8080

# Command to run when the container starts
CMD [ "npm", "start" ]
