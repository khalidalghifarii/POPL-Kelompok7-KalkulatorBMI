FROM nginx:alpine

COPY *.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/

ENV PORT 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
