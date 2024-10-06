FROM nginx:alpine

COPY dist/*.html /usr/share/nginx/html/
COPY dist/*.css /usr/share/nginx/html/
COPY dist/*.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
