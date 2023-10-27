FROM node:18 as build

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --frozen-lockfile

COPY . /app/

#RUN CI=1 npm test

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
