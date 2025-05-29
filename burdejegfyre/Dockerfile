FROM node:latest as build-stage
WORKDIR /app
COPY ./ .
RUN npm install
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
