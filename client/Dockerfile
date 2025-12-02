# 1. Use an official Node.js image as the base
# "alpine" is a very small, lightweight version of Linux
FROM node:22-alpine AS builder

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
# We do this separately to take advantage of Docker caching.
# Docker won't re-install node_modules unless package.json changes.
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your React code
COPY . .

# 6. Expose the port Vite runs on
EXPOSE 5173

# 7. Start the application
# "--host" is CRITICAL. It tells Vite to listen on all IPs (0.0.0.0).
# Without this, Vite only listens on localhost inside the box, and you can't reach it.
CMD ["npm", "run", "dev", "--", "--host"]