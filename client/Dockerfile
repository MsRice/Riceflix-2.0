# Use official Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# If using TypeScript, build the project
RUN npm run build

# Expose backend port
EXPOSE 5173

# Start server
CMD ["npm", "run" , "dev"]
