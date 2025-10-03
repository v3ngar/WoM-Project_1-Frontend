FROM nginxinc/nginx-unprivileged:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 8080
