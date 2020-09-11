# Encrypted at rest API

## Introduction

Simple REST API with two endpoints, to save and retrieve data encrypted at rest. Stored data is encrypted on update and decrypted on read with the key provided by the client.

The API was deployed as live-demo on [http://encrypted-at-rest-api-100.herokuapp.com/](http://encrypted-at-rest-api-100.herokuapp.com/)

## Compodoc documentation

While the application is running, documentation is available on http://localhost:8080.

[live-demo documentation](http://encrypted-at-rest-api-100.herokuapp.com/)

## Security

Dependencies used to increase security:
[Helmet](https://owasp.org/www-project-top-ten/)https://github.com/helmetjs/helmet)
[Express Rate Limit](https://github.com/nfriedly/express-rate-limit)

The limit of requests per each one minute for the IP is 60.
The limit of data items in one request is 1000.
API was briefly reviewed in terms of  [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Configuration

Copy example.env as .env and update below variables with real data
``` bash
 DATABASE_NAME
 DATABASE_HOST
 DATABASE_PASSWORD
 DATABASE_PORT
 DATABASE_USER
 IGNORE_ENV_FILE
 ```
`IGNORE_ENV_FILE` - Set to `true` to disable env variables loading([more info](https://docs.nestjs.com/techniques/configuration#disable-env-variables-loading))

## Installation

``` bash
$ npm install
```

## Running the app

``` bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The App will be available on [http://localhost:8080/](http://localhost:8080/)(If port wasn't changed in `.env` ).

## Test

``` bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Unit tests coverage: 100%

## Swagger UI

While the application is running, Swagger UI is available on http://localhost:8080.

[live-demo Swagger UI](http://encrypted-at-rest-api-100.herokuapp.com/api)

## Notes

* Nest.js Readme archived as `README nestjs.md`
* `logs.service.ts` unit tests coverage was realized by unit tests of other modules.
* To regenerate project documentation use command `npx compodoc -p tsconfig.json -s`

## License

Encrypted at rest API is [ISC licensed](LICENSE).
