FROM node:alpine AS client

USER node
RUN mkdir -p /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node ./package.json package-lock.json ./
RUN npm install
COPY --chown=node:node ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=client /home/node/app/dist /usr/share/nginx/html
