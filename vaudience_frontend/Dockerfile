# Используем базовый образ Node.js
FROM node:23-slim AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем легковесный образ Nginx для отдачи статики
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг Nginx (если есть)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт, на котором работает Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]