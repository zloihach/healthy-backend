# Используем официальный образ Node.js версии 18
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

ENV NODE_ENV=development

# Генерируем клиент Prisma
RUN npx prisma generate

# Собираем проект
RUN npm run build

# Проверяем содержимое директории dist
RUN ls -la dist/src

# Открываем порт для приложения
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/src/main"]
