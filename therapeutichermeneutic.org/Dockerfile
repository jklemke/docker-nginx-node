FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app


WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./index.js ./index.js

RUN npm install

EXPOSE 8181

CMD ["node", "index"]

