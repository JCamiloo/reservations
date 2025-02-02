FROM node:20.12.2-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

CMD [ "pnpm", "test" ]
