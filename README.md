# Encrypted at rest API

## Introduction

Simple REST API with two endpoints, to save and retrieve data encrypted at rest. Stored data is encrypted on update and decrypted on read with the key provided by the client.

The API was deployed as live-demo on [http://encrypted-at-rest-api-100.herokuapp.com/](http://encrypted-at-rest-api-100.herokuapp.com/)


## Implementation details

Used dependencies:
- [NestJS](https://nestjs.com/)
- [crypto-js](https://github.com/brix/crypto-js)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [TypeScript](https://www.typescriptlang.org/)


## Configuration

Copy example.env as .env and update below variables with real data

`DATABASE_NAME`

`DATABASE_HOST`

`DATABASE_PASSWORD`

`DATABASE_PORT`

`DATABASE_USER`

`IGNORE_ENV_FILE` - Set to `true` to disable env variables loading([more info](https://docs.nestjs.com/techniques/configuration#disable-env-variables-loading))


## Installation

```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
The App will be available on [http://localhost:3000/](http://localhost:3000/)(If port wasn't changed in `.env`).

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Endpoints

While the application is running, open your browser and navigate to http://localhost:3000. You should see the
Swagger UI with list of endpoints.

[Swagger UI of live-demo](http://encrypted-at-rest-api-100.herokuapp.com/)

## Notes

* Nest.js Readme archived as `README nestjs.md`
* logs.service.ts unit tests coverage was realized by unit tests of other modules.

## License

  Encrypted at rest API is [ISC licensed](LICENSE).