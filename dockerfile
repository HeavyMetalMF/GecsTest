FROM node:16 as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app
RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]