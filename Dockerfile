FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Har du inte package-lock.json i repot? Byt raden till:
# RUN npm install --omit=dev
RUN npm ci --omit=dev
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm","start"]
