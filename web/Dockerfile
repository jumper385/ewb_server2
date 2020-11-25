FROM node
WORKDIR /app
COPY package*.json .
RUN yarn install && yarn build
COPY . . 
EXPOSE 3000
CMD ["npm","start"]