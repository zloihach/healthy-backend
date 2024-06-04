FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN apk add openssl3
RUN npm install

COPY . .


ENV NODE_ENV=development
RUN npx prisma generate

RUN npm run build

RUN ls -la dist/src

EXPOSE 3000

CMD ["node", "dist/src/main"]
