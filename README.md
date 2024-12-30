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

# nest.js-kafka

This is a simple practice **NestJS Kafka Microservice** designed to demonstrate the implementation of microservices architecture using Kafka transport. The application showcases how to create and manage microservices that communicate over Kafka, enabling efficient and scalable inter-service communication. It serves as a foundational project to understand Kafka-based microservice integration in a NestJS framework and is built with modularity and scalability in mind

## Table of Content

- [nest.js-kafka](#nestjs-kafka)
  - [Table of Content](#table-of-content)
  - [Project Structure](#project-structure)
    - [Core](#core)
    - [User](#user)
    - [Token](#token)
    - [Task](#task)
  - [Key Features](#key-features)
  - [Prerequisites](#prerequisites)
  - [Setting Up Kafka with Docker](#setting-up-kafka-with-docker)
    - [Steps to Run Kafka with Docker](#steps-to-run-kafka-with-docker)
  - [Installation and Setup](#installation-and-setup)
  - [Accessing Swagger UI](#accessing-swagger-ui)
  - [License](#license)
  - [Contributors](#contributors)

## Project Structure

The project is divided into several services, each with a specific responsibility. Below is the directory structure of the project's main services:

### Core

The `core` directory contains the main application that communicates with the front-end. It acts as the gateway for all incoming requests and routes them to the appropriate microservices.

### User

The `user` directory contains the microservice responsible for user registration and login functionalities. It handles user-related operations such as creating new users and authenticating existing users.

### Token

The `token` directory contains the microservice responsible for access token management. It handles the creation, validation, and revocation of access tokens used for securing communication between services.

### Task

The `task` directory contains the microservice responsible for task management. It handles task-related operations.

Each service is designed to be modular and scalable, allowing for efficient and maintainable development.

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

## Installation and Setup

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/saeedNW/nest.js-kafka.git
   ```

2. **Navigate to the project directory**:

   ```shell
   cd nest.js-kafka
   ```

3. **Install and run each service**:

   To run the services in this project, follow the instructions provided in each service's `README.md` file. For a quick overview, you can follow these steps:

   1. Navigate to each service's directory using a terminal.
   2. Install the required dependencies.

      ```bash
      npm install
      ```

   3. Start each service individually.

      ```bash
      npm run start:dev
      ```

   This approach ensures that each service operates independently and as intended.

## Accessing Swagger UI

This application provides interactive API documentation using Swagger.

To access the Swagger UI:

1. Start the core application in development or production mode.
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
