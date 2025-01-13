FROM node:22

WORKDIR /serasa-test

COPY package.json .

RUN npm install

COPY . .

CMD npm run migration:run

CMD npm start