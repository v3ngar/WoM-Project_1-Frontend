# Minimal Node-bild
FROM node:20-alpine

WORKDIR /app

# Installera bara det som behövs för att köra
COPY package*.json ./
RUN npm ci --omit=dev

# Kopiera in ALL front-end statik och servern
COPY . .

# Kör på 8080 (Rahti/OKD kör gärna 8080 och slumpad UID)
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
