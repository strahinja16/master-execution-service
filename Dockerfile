## builder
FROM node:10.16-alpine AS builder
RUN apk add --no-cache python

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

## production
FROM node:10.16-alpine
ENV NODE_ENV=production
RUN apk add --no-cache python

WORKDIR /usr/src/app

COPY .travis.yml ./
COPY kube-config.yaml ./
COPY .env.production ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE 3000
EXPOSE 50051

CMD [ "npm", "run", "start:prod" ]
