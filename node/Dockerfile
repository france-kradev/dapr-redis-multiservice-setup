FROM node:16.11.1-alpine3.11 AS base
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]
