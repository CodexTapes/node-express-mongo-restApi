FROM node:slim

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "run","dev"]
