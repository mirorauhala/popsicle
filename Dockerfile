FROM node:lts AS builder
WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

###

FROM node:lts
WORKDIR /app

COPY --from=builder /app /app
RUN npm install -g json-server

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/json-server", "-H", "0.0.0.0",  "--static", "./build", "db.json"]
