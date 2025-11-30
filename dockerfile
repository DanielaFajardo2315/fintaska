FROM node:20

# Carpeta workdir dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json si existe
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto (ajústalo si tu app usa otro)
EXPOSE 3000

# Comando para arrancar la app
CMD ["npm", "start"]