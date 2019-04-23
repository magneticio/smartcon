FROM node:10-alpine as base

WORKDIR /app

COPY package.json .

FROM base AS build

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules

COPY . .

RUN npm install && npm run build

FROM base AS build-client

COPY ./client ./client

RUN npm install --prefix client && npm run build --prefix client

FROM base AS release

ENV NODE_ENV=production

COPY --from=build /app/prod_node_modules ./node_modules
COPY --from=build /app/dist .
COPY --from=build-client /app/client/build ./client/build

EXPOSE 5000
CMD [ "npm", "run", "start" ]