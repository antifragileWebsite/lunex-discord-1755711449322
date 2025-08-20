# Use a lightweight Node.js image
FROM node:20-slim
# Set working directory
WORKDIR /app
# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production
# Copy the rest of the app
COPY . .
# Create a simple health check server for Koyeb
RUN echo 'const express = require("express"); \
const app = express(); \
const port = process.env.PORT || 8000; \
app.get("/", (req, res) => res.send("OK")); \
app.listen(port, () => console.log(`Health check server running on port ${port}`));' > health-check.js
# Run both the health check server and the bot in the background
CMD ["sh", "-c", "node health-check.js & node bot.js"]