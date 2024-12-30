<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The core application is a microservice built with the NestJS framework, utilizing Kafka for seamless inter-service communication. It serves as the central hub of the system, acting as the primary gateway for all incoming requests from the front-end. This application is responsible for routing these requests to the appropriate microservices, ensuring efficient handling and coordination across the architecture.

## Table of Content

- [Description](#description)
- [Table of Content](#table-of-content)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Setting Up Kafka with Docker](#setting-up-kafka-with-docker)
  - [Steps to Run Kafka with Docker](#steps-to-run-kafka-with-docker)
- [Getting Started](#getting-started)
- [Installation and Setup](#installation-and-setup)
- [Compile and run the project](#compile-and-run-the-project)
- [Accessing Swagger UI](#accessing-swagger-ui)
- [License](#license)
- [Contributors](#contributors)

## Key Features

- **Modular Architecture**: Each service is designed to be independent and modular, promoting separation of concerns and ease of maintenance.
- **Kafka Transport**: Utilizes Kafka for inter-service communication, ensuring efficient and reliable message delivery.
- **Scalability**: Built with scalability in mind, allowing easy addition of new services and horizontal scaling.
- **User Authentication**: Provides user registration and authentication functionalities.
- **Token Management**: Manages access tokens for secure communication between services.
- **Task Management**: Handles task-related operations.
- **Extensible**: Easily extendable to include additional microservices as needed.
- **NestJS Framework**: Leverages the powerful features of the NestJS framework for building efficient server-side applications.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Kafka](https://kafka.apache.org/)

## Setting Up Kafka with Docker

To set up Kafka with Docker, you can use the `docker-compose.yaml` file provided in the project directory. This file defines the necessary services for running Kafka and Zookeeper, which is required by Kafka for managing its brokers.

### Steps to Run Kafka with Docker

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Navigate to the project directory where the `docker-compose.yaml` file is located.
3. Run the following command to start the Kafka and Zookeeper services:

```shell
docker compose up
```

## Getting Started

To get started with the core application, follow the instructions in the sections below to set up, compile, run the project:

## Installation and Setup

Install project dependencies:

```shell
npm install
```

Note that the application default Listing port is `3000`.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build production
$ npm run build

# production mode
$ npm run start:prod
```

## Accessing Swagger UI

This application provides interactive API documentation using Swagger.

To access the Swagger UI:

1. Start the application in development or production mode.
2. Open your web browser and navigate to:

   ```bash
   http://localhost:3000/api-doc
   ```

3. Use the Swagger interface to explore and test the available APIs.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎ ‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the nest.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
