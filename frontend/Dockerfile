FROM node:20-alpine3.18

WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala todas las dependencias, incluyendo react-router-dom
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que Vite utiliza por defecto
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]
