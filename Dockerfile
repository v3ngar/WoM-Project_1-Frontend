FROM nginxinc/nginx-unprivileged:1.27-alpine
WORKDIR /usr/share/nginx/html
# rensa default-sidor så vi alltid ser våra filer
RUN rm -rf /usr/share/nginx/html/* || true

# kopiera din frontend
COPY . .

# aktivera proxyn
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
