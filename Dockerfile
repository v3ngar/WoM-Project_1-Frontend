FROM nginxinc/nginx-unprivileged:1.27-alpine
WORKDIR /usr/share/nginx/html

# kopiera statiska frontend
COPY . .

# ersätt default-server med proxy + statik
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
