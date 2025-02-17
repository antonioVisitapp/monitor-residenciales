FROM node:20

# Instalar cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos
COPY package*.json ./
RUN npm install
COPY . .


# Construir la aplicación
RUN npm run build


# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
