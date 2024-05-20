FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

RUN npx prisma generate

RUN npm run build

RUN ls -la dist/src

EXPOSE 3000

CMD ["node", "dist/src/main"]
