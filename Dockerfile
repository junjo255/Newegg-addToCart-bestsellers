FROM node:latest


WORKDIR /app
# where our app live in the container

COPY package.json ./ 

RUN npm install

COPY . .

EXPOSE 3005


CMD ["npm", "start"]