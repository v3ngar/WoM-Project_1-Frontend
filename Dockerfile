FROM nginxinc/nginx-unprivileged:1.27-alpine
WORKDIR /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/* || true
COPY . .
EXPOSE 8080
