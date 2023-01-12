<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Features

⚡️ Nest\
⚡️ Docker\
⚡️ MongoDB and Mongoose

## Installation

```bash
$ npm i -g @nestjs/cli
```

```bash
$ pnpm install
```

### Running the DB

```bash
docker compose up --build -d
```

### .env

Create `.env` file based on `.env.template`

### Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Populate DB

```bash
# HTTP Get request

curl http://localhost:3000/api/v1/seed
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
