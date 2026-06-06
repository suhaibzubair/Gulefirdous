# Stage 1: Build the Node.js application
FROM node:14 AS node_app

WORKDIR /usr/src/app/frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Use Nginx to serve the static files
FROM nginx:latest

# Copy the built files from the previous stage
COPY --from=node_app /usr/src/app/frontend/build /usr/share/nginx/html

# Optional: Copy Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
