FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Serve aşaması (nginx üzerinden)
FROM nginx:stable-alpine

# Build’lenen dosyaları nginx’in public klasörüne kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
