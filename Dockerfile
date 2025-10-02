FROM nginx:alpine
# rensa default-sida
RUN rm -rf /usr/share/nginx/html/*
# kopiera alla statiska filer (index.html, script.js, style.css, mainpage/, signup/ ...)
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
