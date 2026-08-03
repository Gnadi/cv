# Next 16 requires Node 20.9+ (see the "engines" field of the next package).
# https://hub.docker.com/_/node
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install dependencies from the lockfile so the image matches local installs.
RUN npm ci

# Copy local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]
