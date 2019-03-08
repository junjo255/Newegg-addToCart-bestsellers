FROM node:latest


WORKDIR /user/src/app
# where our app live in the container

COPY package.json ./ 

RUN npm install

COPY . .

EXPOSE 3005


CMD ["npm", "start"]