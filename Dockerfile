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
RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

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
